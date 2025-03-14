using billtracker_api.Pagination;

namespace billtracker_api.Bills.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

internal sealed record GetSellerBillsListRequest
{
	[RouteParam]
	public int SellerId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetSellerBillsListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSellerBillsListRequest, Ok<PagedList<BillListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/sellers/{sellerId}/bills/list");
		Description(x => x.WithTags("Sellers"));
	}

	public override async Task<Ok<PagedList<BillListDto>>> ExecuteAsync(GetSellerBillsListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items)
			.Where(x => x.SellerId == req.SellerId)
			.OrderByDescending(x => x.Date);

		var bills = query.Select(x => x.ToBillListDto());

		var billsList = await PagedList<BillListDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsList);
	}
}
