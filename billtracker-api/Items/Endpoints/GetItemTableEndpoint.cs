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
		Roles("User");
		Get("/api/items/table");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Ok<PagedList<ItemTableDto>>> ExecuteAsync(GetItemTableRequest req, CancellationToken ct)
	{
		IQueryable<Item> query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product)
			.Include(x => x.Bill)
			.ThenInclude(x => x.Customer);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var bills = query.Select(x => x.ToItemTableDto());

		var billsTable = await PagedList<ItemTableDto>
			.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsTable);
	}

	private static IQueryable<Item> Search(string? searchQuery, IQueryable<Item> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x =>
			x.Product.Name.ToUpper().Contains(capitalSearchQuery) || x.Bill.BillNumber.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Item> Sort(string? sortBy, IQueryable<Item> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"quantity-asc" => query.OrderBy(x => x.Quantity),
			"quantity-desc" => query.OrderByDescending(x => x.Quantity),
			"totalPrice-asc" => query.OrderBy(x => x.TotalPrice),
			"totalPrice-desc" => query.OrderByDescending(x => x.TotalPrice),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
