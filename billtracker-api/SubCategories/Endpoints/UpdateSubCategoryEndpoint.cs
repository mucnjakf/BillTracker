using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record UpdateSubCategoryRequest
{
	[RouteParam]
	public int SubCategoryId { get; init; }

	public string Name { get; init; } = null!;

	public int CategoryId { get; init; }
}

internal sealed class UpdateSubCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateSubCategoryRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.SubCategories}/{{subCategoryId}}");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		UpdateSubCategoryRequest req,
		CancellationToken ct)
	{
		var subCategory = await appDbContext.SubCategories.FindAsync([req.SubCategoryId], cancellationToken: ct);

		if (subCategory is null)
		{
			return TypedResults.NotFound();
		}
		
		var category = await appDbContext.Categories.FindAsync([req.CategoryId], cancellationToken: ct);

		if (category is null)
		{
			return TypedResults.NotFound();
		}

		var subCategoryExists = await appDbContext.SubCategories
			.AsNoTracking()
			.AnyAsync(x => x.Name.ToUpper() == req.Name.ToUpper() && x.CategoryId == category.Id, ct);

		if (subCategoryExists)
		{
			return TypedResults.BadRequest();
		}
		
		subCategory.Name = req.Name;
		subCategory.CategoryId = category.Id;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
