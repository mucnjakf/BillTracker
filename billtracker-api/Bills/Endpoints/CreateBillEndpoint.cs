using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Bills.Endpoints;

internal sealed record CreateBillRequest
{
	public DateTimeOffset Date { get; init; }

	public string BillNumber { get; init; } = null!;

	public string Comment { get; init; } = null!;

	public int CustomerId { get; init; }

	public int? SellerId { get; init; }

	public int? CreditCardId { get; init; } // TODO: remove
}

internal sealed class CreateBillEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateBillRequest, Results<Created<BillDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Bills);
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Results<Created<BillDto>, NotFound>> ExecuteAsync(
		CreateBillRequest req,
		CancellationToken ct)
	{
		var customer = await appDbContext.Customers.FindAsync([req.CustomerId], ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		var seller = await appDbContext.Sellers.FindAsync([req.SellerId], ct);

		var creditCard = await appDbContext.CreditCards.FindAsync([req.CreditCardId], ct);

		var bill = new Bill
		{
			Date = req.Date,
			BillNumber = req.BillNumber,
			Comment = req.Comment,
			CustomerId = customer.Id,
			SellerId = seller?.Id,
			CreditCardId = creditCard?.Id
		};

		await appDbContext.Bills.AddAsync(bill, ct);
		await appDbContext.SaveChangesAsync(ct);

		var billDto = bill.ToBillDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/customers/{customer.Id}/bills/{bill.Id}", billDto);
	}
}
