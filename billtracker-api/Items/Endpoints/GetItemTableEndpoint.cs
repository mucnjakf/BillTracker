using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetItemTableRequest
{
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
		Roles(AppRoles.User);
		Get($"{AppRoutes.Items}/table");
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override async Task<Ok<PagedList<ItemTableDto>>> ExecuteAsync(GetItemTableRequest req, CancellationToken ct)
	{
		IQueryable<Item> query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Bill)
			.ThenInclude(x => x.Customer)
			.Include(x => x.Product);

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

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x => x.Product.Name.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Item> Sort(string? sortBy, IQueryable<Item> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"productName-asc" => query.OrderBy(x => x.Product.Name),
			"productName-desc" => query.OrderByDescending(x => x.Product.Name),
			"total-asc" => query.OrderBy(x => x.TotalPrice),
			"total-desc" => query.OrderByDescending(x => x.TotalPrice),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
