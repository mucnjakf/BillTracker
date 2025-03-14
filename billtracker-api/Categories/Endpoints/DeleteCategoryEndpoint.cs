using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed record DeleteCategoryRequest
{
	[RouteParam]
	public int CategoryId { get; init; }
}

internal sealed class DeleteCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteCategoryRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Categories}/{{categoryId}}");
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteCategoryRequest req,
		CancellationToken ct)
	{
		var category = await appDbContext.Categories
			.Include(x => x.SubCategories)
			.SingleOrDefaultAsync(x => x.Id == req.CategoryId, ct);

		if (category is null)
		{
			return TypedResults.NotFound();
		}

		if (category.SubCategories is not null && category.SubCategories.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Categories.Remove(category);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
