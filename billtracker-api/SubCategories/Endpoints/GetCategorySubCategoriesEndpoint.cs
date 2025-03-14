using billtracker_api.Auth;
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
	: Endpoint<GetCategorySubCategoriesRequest, Ok<IEnumerable<SubCategoryDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Categories}/{{categoryId}}/subcategories");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<IEnumerable<SubCategoryDto>>> ExecuteAsync(GetCategorySubCategoriesRequest req, CancellationToken ct)
	{
		var subCategories = await appDbContext.SubCategories
			.AsNoTracking()
			.Where(x => x.CategoryId == req.CategoryId)
			.ToListAsync(ct);

		var subCategoriesDto = subCategories.Select(x => x.ToSubCategoryDto());

		return TypedResults.Ok(subCategoriesDto);
	}
}
