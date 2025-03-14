using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed record GetCategoryRequest
{
	[RouteParam]
	public int CategoryId { get; init; }
}

internal sealed class GetCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCategoryRequest, Results<Ok<CategoryDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Categories}/{{categoryId}}");
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Results<Ok<CategoryDto>, NotFound>> ExecuteAsync(
		GetCategoryRequest req,
		CancellationToken ct)
	{
		var category = await appDbContext.Categories
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Id == req.CategoryId, ct);

		if (category is null)
		{
			return TypedResults.NotFound();
		}

		var cityDto = category.ToCategoryDto();

		return TypedResults.Ok(cityDto);
	}
}
