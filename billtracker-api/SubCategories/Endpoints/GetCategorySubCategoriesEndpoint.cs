using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetCategorySubCategoriesRequest
{
	[RouteParam]
	public int CategoryId { get; init; }
}

internal sealed class GetCategorySubCategoriesEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCategorySubCategoriesRequest, Ok<IEnumerable<SubCategoryListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/categories/{categoryId}/subcategories");
		Description(x => x.WithTags("Sub-categories"));
	}

	public override async Task<Ok<IEnumerable<SubCategoryListDto>>> ExecuteAsync(GetCategorySubCategoriesRequest req, CancellationToken ct)
	{
		var subCategories = await appDbContext.SubCategories
			.AsNoTracking()
			.Where(x => x.CategoryId == req.CategoryId)
			.ToListAsync(ct);

		var subCategoriesDto = subCategories.Select(x => x.ToSubCategoryListDto());

		return TypedResults.Ok(subCategoriesDto);
	}
}
