using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed record GetCategoryTableRequest
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

internal sealed class GetCategoryTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCategoryTableRequest, Ok<PagedList<CategoryTableDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Categories}/table");
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Ok<PagedList<CategoryTableDto>>> ExecuteAsync(
		GetCategoryTableRequest req,
		CancellationToken ct)
	{
		IQueryable<Category> query = appDbContext.Categories
			.AsNoTracking()
			.Include(x => x.SubCategories);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var categories = query.Select(x => x.ToCategoryTableDto());

		var categoriesTable = await PagedList<CategoryTableDto>
			.ToPagedListAsync(categories, req.PageNumber, req.PageSize);

		return TypedResults.Ok(categoriesTable);
	}

	private static IQueryable<Category> Search(string? searchQuery, IQueryable<Category> query)
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

	private static IQueryable<Category> Sort(string? sortBy, IQueryable<Category> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"subCategoriesCount-asc" => query.OrderBy(x => x.SubCategories!.Count()),
			"subCategoriesCount-desc" => query.OrderByDescending(x => x.SubCategories!.Count()),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}