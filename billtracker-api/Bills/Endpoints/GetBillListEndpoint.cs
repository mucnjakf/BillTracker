using billtracker_api.Auth;
using billtracker_api.Pagination;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetBillListRequest
{
	[QueryParam]
	public int? SellerId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetBillListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillListRequest, Ok<PagedList<BillListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/list");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<PagedList<BillListDto>>> ExecuteAsync(GetBillListRequest req, CancellationToken ct)
	{
		IQueryable<Bill> query = appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items);

		if (req.SellerId is not null)
		{
			query = query.Where(x => x.SellerId == req.SellerId);
		}

		query = query.OrderByDescending(x => x.Date);

		var bills = query.Select(x => x.ToBillListDto());

		var billsList = await PagedList<BillListDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsList);
	}
}
