using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetBillsLatestRequest
{
	[QueryParam]
	public int? CustomerId { get; init; }
}

internal sealed class GetBillsLatestEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillsLatestRequest, Ok<IEnumerable<BillListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/latest");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<IEnumerable<BillListDto>>> ExecuteAsync(GetBillsLatestRequest req, CancellationToken ct)
	{
		IQueryable<Bill> query = appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items);

		if (req.CustomerId is not null)
		{
			query = query.Where(x => x.CustomerId == req.CustomerId);
		}

		query = query
			.OrderByDescending(x => x.Date)
			.Take(10);

		var bills = await query.ToListAsync(ct);

		var billDtos = bills.Select(x => x.ToBillListDto());

		return TypedResults.Ok(billDtos);
	}
}
