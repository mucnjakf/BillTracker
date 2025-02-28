using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Entities;
using billtracker_api.Mappers;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Endpoints;

internal sealed record CreateBillRequest
{
	[RouteParam]
	public int CustomerId { get; set; }

	public DateTimeOffset Date { get; set; }

	public string BillNumber { get; set; } = null!;

	public string Comment { get; set; } = null!;

	public int? SellerId { get; set; }

	public int? CreditCardId { get; set; } // TODO: doesent make sense to have credit card  here without customer
}

internal sealed class CreateBillEndpoint(AppDbContext appDbContext) : Endpoint<CreateBillRequest, Results<Created<BillDto>, NotFound>>
{
	public override void Configure()
	{
		Post("/api/customers/{customerId}/bills");
		AllowAnonymous();
	}

	public override async Task<Results<Created<BillDto>, NotFound>> ExecuteAsync(CreateBillRequest req, CancellationToken ct)
	{
		var customer = await appDbContext.Customers.FindAsync([req.CustomerId], ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		var seller = await appDbContext.Sellers.FindAsync([req.SellerId], ct);

		var creditCard = await appDbContext.CreditCards.FindAsync([req.SellerId], ct);

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
