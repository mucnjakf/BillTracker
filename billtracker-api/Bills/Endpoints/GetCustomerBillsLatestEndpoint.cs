using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetCustomerBillsLatestRequest
{
	[QueryParam]
	public int CustomerId { get; init; }
}

internal sealed class GetCustomerBillsLatestEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerBillsLatestRequest, Ok<IEnumerable<BillListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/latest");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<IEnumerable<BillListDto>>> ExecuteAsync(GetCustomerBillsLatestRequest req, CancellationToken ct)
	{
		var query = await appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items)
			.Where(x => x.CustomerId == req.CustomerId)
			.OrderByDescending(x => x.Date)
			.Take(10)
			.ToListAsync(ct);

		var bills = query.Select(x => x.ToBillListDto());

		return TypedResults.Ok(bills);
	}
}
