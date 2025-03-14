using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetItemListRequest
{
	[QueryParam]
	public int? BillId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetItemListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetItemListRequest, Ok<PagedList<ItemListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Items}/list");
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override async Task<Ok<PagedList<ItemListDto>>> ExecuteAsync(GetItemListRequest req, CancellationToken ct)
	{
		IQueryable<Item> query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product);

		if (req.BillId is not null)
		{
			query = query.Where(x => x.BillId == req.BillId);
		}

		query = query.OrderByDescending(x => x.TotalPrice);

		var items = query.Select(x => x.ToItemListDto());

		var itemsList = await PagedList<ItemListDto>.ToPagedListAsync(items, req.PageNumber, req.PageSize);

		return TypedResults.Ok(itemsList);
	}
}
