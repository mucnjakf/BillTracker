using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetBillItemListRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetBillItemListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillItemListRequest, Ok<PagedList<ItemListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/bills/{billId}/items/list");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Ok<PagedList<ItemListDto>>> ExecuteAsync(GetBillItemListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product)
			.Where(x => x.BillId == req.BillId);

		var items = query.Select(x => x.ToItemListDto());

		var itemsList = await PagedList<ItemListDto>.ToPagedListAsync(items, req.PageNumber, req.PageSize);

		return TypedResults.Ok(itemsList);
	}
}
