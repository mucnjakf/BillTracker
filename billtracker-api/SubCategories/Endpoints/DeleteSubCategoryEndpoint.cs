using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record DeleteSubCategoryRequest
{
	[RouteParam]
	public int SubCategoryId { get; init; }
}

internal sealed class DeleteSubCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteSubCategoryRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.SubCategories}/{{subCategoryId}}");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteSubCategoryRequest req,
		CancellationToken ct)
	{
		var subCategory = await appDbContext.SubCategories
			.Include(x => x.Products)
			.SingleOrDefaultAsync(x => x.Id == req.SubCategoryId, ct);

		if (subCategory is null)
		{
			return TypedResults.NotFound();
		}

		if (subCategory.Products is not null && subCategory.Products.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.SubCategories.Remove(subCategory);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
