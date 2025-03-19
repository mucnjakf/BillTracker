using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetProductTableRequest
{
	[QueryParam]
	public int? SubCategoryId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;

	[QueryParam]
	public string? SortBy { get; init; } = null;
}

internal sealed class GetProductTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetProductTableRequest, Ok<PagedList<ProductTableDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Products}/table");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Ok<PagedList<ProductTableDto>>> ExecuteAsync(
		GetProductTableRequest req,
		CancellationToken ct)
	{
		var query = appDbContext.Products
			.Include(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.AsNoTracking();

		if (req.SubCategoryId is not null)
		{
			query = query.Where(x => x.SubCategoryId == req.SubCategoryId);
		}

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var products = query.Select(x => x.ToProductTableDto());

		var productsTable = await PagedList<ProductTableDto>
			.ToPagedListAsync(products, req.PageNumber, req.PageSize);

		return TypedResults.Ok(productsTable);
	}

	private static IQueryable<Product> Search(string? searchQuery, IQueryable<Product> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x =>
			x.Name.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Product> Sort(string? sortBy, IQueryable<Product> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"price-asc" => query.OrderBy(x => x.Price),
			"price-desc" => query.OrderByDescending(x => x.Price),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
