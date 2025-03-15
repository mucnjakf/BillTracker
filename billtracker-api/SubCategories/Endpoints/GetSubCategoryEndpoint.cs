using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetSubCategoryRequest
{
	[RouteParam]
	public int SubCategoryId { get; init; }

	[QueryParam]
	public int? CategoryId { get; init; }
}

internal sealed class GetSubCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoryRequest, Results<Ok<SubCategoryDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.SubCategories}/{{subCategoryId}}");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Results<Ok<SubCategoryDto>, NotFound>> ExecuteAsync(
		GetSubCategoryRequest req,
		CancellationToken ct)
	{
		var subCategory = await appDbContext.SubCategories
			.AsNoTracking()
			.Include(x => x.Category)
			.SingleOrDefaultAsync(x => x.Id == req.SubCategoryId, ct);

		if (subCategory is null)
		{
			return TypedResults.NotFound();
		}

		if (req.CategoryId is not null && subCategory.CategoryId != req.CategoryId)
		{
			return TypedResults.NotFound();
		}

		var subCategoryDto = subCategory.ToSubCategoryDto();

		return TypedResults.Ok(subCategoryDto);
	}
}
