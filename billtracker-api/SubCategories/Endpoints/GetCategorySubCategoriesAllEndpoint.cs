using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetCategorySubCategoriesAllRequest
{
	[QueryParam]
	public int CategoryId { get; init; }
}

internal sealed class GetCategorySubCategoriesAllEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCategorySubCategoriesAllRequest, Ok<IEnumerable<SubCategoryDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.SubCategories);
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<IEnumerable<SubCategoryDto>>> ExecuteAsync(GetCategorySubCategoriesAllRequest req, CancellationToken ct)
	{
		var subCategories = await appDbContext.SubCategories
			.AsNoTracking()
			.Include(x => x.Category)
			.Where(x => x.CategoryId == req.CategoryId)
			.ToListAsync(ct);

		var subCategoriesDto = subCategories.Select(x => x.ToSubCategoryDto());

		return TypedResults.Ok(subCategoriesDto);
	}
}
