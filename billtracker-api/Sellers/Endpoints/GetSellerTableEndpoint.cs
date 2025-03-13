using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed record GetSellerTableRequest
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

internal sealed class GetSellerTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSellerTableRequest, Ok<PagedList<SellerTableDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/sellers/table");
		Description(x => x.WithTags("Sellers"));
	}

	public override async Task<Ok<PagedList<SellerTableDto>>> ExecuteAsync(
		GetSellerTableRequest req,
		CancellationToken ct)
	{
		IQueryable<Seller> query = appDbContext.Sellers
			.AsNoTracking()
			.Include(x => x.Bills);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var sellers = query.Select(x => x.ToSellerTableDto());

		var sellersTable = await PagedList<SellerTableDto>
			.ToPagedListAsync(sellers, req.PageNumber, req.PageSize);

		return TypedResults.Ok(sellersTable);
	}

	private static IQueryable<Seller> Search(string? searchQuery, IQueryable<Seller> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x =>
			x.Name.ToUpper().Contains(capitalSearchQuery) || 
			x.Surname.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Seller> Sort(string? sortBy, IQueryable<Seller> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"surname-asc" => query.OrderBy(x => x.Surname),
			"surname-desc" => query.OrderByDescending(x => x.Surname),
			"billsCount-asc" => query.OrderBy(x => x.Bills!.Count()),
			"billsCount-desc" => query.OrderByDescending(x => x.Bills!.Count()),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}