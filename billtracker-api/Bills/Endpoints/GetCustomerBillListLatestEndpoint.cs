using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetCustomerBillListLatestRequest
{
	[RouteParam]
	public int CustomerId { get; init; }
}

internal sealed class GetCustomerBillListLatestEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerBillListLatestRequest, Ok<IEnumerable<BillListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/customers/{customerId}/bills/list/latest");
		Description(x => x.WithTags("Bills"));
	}

	public override async Task<Ok<IEnumerable<BillListDto>>> ExecuteAsync(GetCustomerBillListLatestRequest req, CancellationToken ct)
	{
		var query = await appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items)
			.Where(x => x.CustomerId == req.CustomerId)
			.OrderByDescending(x => x.Date)
			.Take(10)
			.ToListAsync(ct);

		var billsList = query.Select(x => x.ToBillListDto());

		return TypedResults.Ok(billsList);
	}
}
