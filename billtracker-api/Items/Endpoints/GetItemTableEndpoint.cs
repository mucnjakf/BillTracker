using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetItemTableRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;

	[QueryParam]
	public string? SortBy { get; init; } = null;
}

internal sealed class GetItemTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetItemTableRequest, Ok<PagedList<ItemTableDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/bills/{billId}/items/table");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Ok<PagedList<ItemTableDto>>> ExecuteAsync(GetItemTableRequest req, CancellationToken ct)
	{
		var query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product)
			.Where(x => x.BillId == req.BillId);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var items = query.Select(x => x.ToItemTableDto());

		var itemsTable = await PagedList<ItemTableDto>
			.ToPagedListAsync(items, req.PageNumber, req.PageSize);

		return TypedResults.Ok(itemsTable);
	}
	private static IQueryable<Item> Search(string? searchQuery, IQueryable<Item> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalizedSearchQuery = searchQuery.ToUpper();

		query = query.Where(x => x.Product.Name.Contains(capitalizedSearchQuery));

		return query;
	}

	private static IQueryable<Item> Sort(string? sortBy, IQueryable<Item> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Product.Name),
			"name-desc" => query.OrderByDescending(x => x.Product.Name),
			"quantity-asc" => query.OrderByDescending(x => x.Quantity),
			"quantity-desc" => query.OrderByDescending(x => x.Quantity),
			"total-price-asc" => query.OrderBy(x => x.TotalPrice),
			"total-price-desc" => query.OrderByDescending(x => x.TotalPrice),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
