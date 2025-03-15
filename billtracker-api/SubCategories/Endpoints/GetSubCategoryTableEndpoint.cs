using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetSubCategoryTableRequest
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

internal sealed class GetSubCategoryTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoryTableRequest, Ok<PagedList<SubCategoryTableDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.SubCategories}/table");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<PagedList<SubCategoryTableDto>>> ExecuteAsync(
		GetSubCategoryTableRequest req,
		CancellationToken ct)
	{
		IQueryable<SubCategory> query = appDbContext.SubCategories
			.AsNoTracking()
			.Include(x => x.Category)
			.Include(x => x.Products);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var subCategories = query.Select(x => x.ToSubCategoryTableDto());

		var subCategoriesTable = await PagedList<SubCategoryTableDto>
			.ToPagedListAsync(subCategories, req.PageNumber, req.PageSize);

		return TypedResults.Ok(subCategoriesTable);
	}

	private static IQueryable<SubCategory> Search(string? searchQuery, IQueryable<SubCategory> query)
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

	private static IQueryable<SubCategory> Sort(string? sortBy, IQueryable<SubCategory> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"productsCount-asc" => query.OrderBy(x => x.Products!.Count()),
			"productsCount-desc" => query.OrderByDescending(x => x.Products!.Count()),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
