using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed class GetCategoriesEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<CategoryDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.Categories);
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Ok<IEnumerable<CategoryDto>>> ExecuteAsync(CancellationToken ct)
	{
		var categories = await appDbContext.Categories
			.AsNoTracking()
			.ToListAsync(ct);

		var categoriesDto = categories.Select(x => x.ToCategoryDto());

		return TypedResults.Ok(categoriesDto);
	}
}