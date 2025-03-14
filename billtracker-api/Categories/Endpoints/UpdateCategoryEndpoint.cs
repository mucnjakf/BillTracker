using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed record UpdateCategoryRequest
{
	[RouteParam]
	public int CategoryId { get; init; }

	public string Name { get; init; } = null!;
}

internal sealed class UpdateCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateCategoryRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Categories}/{{categoryId}}");
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		UpdateCategoryRequest req,
		CancellationToken ct)
	{
		var category = await appDbContext.Categories.FindAsync([req.CategoryId], cancellationToken: ct);

		if (category is null)
		{
			return TypedResults.NotFound();
		}

		var categoryExists = await appDbContext.Categories
			.AsNoTracking()
			.AnyAsync(x => x.Name.ToUpper() == req.Name.ToUpper(), ct);

		if (categoryExists)
		{
			return TypedResults.BadRequest();
		}

		category.Name = req.Name;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
