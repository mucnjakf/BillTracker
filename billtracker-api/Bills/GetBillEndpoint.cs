using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills;

internal sealed record GetBillRequest
{
	[RouteParam]
	public int CustomerId { get; init; }

	[RouteParam]
	public int BillId { get; init; }
}

internal sealed class GetBillEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillRequest, Results<Ok<BillDto>, NotFound>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/customers/{customerId}/bills/{billId}");
		Description(x => x.WithTags("Bills"));
	}

	public override async Task<Results<Ok<BillDto>, NotFound>> ExecuteAsync(GetBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Customer)
			.ThenInclude(x => x.City)
			.Include(x => x.Seller)
			.Include(x => x.CreditCard)
			.Include(x => x.Items)
			.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		var billDto = bill.ToBillDto();

		return TypedResults.Ok(billDto);
	}
}
