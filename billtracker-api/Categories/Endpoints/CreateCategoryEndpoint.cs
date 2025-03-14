using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed record CreateCategoryRequest(string Name);

internal sealed class CreateCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateCategoryRequest, Results<Created<CategoryDto>, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Categories);
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Results<Created<CategoryDto>, BadRequest>> ExecuteAsync(CreateCategoryRequest req, CancellationToken ct)
	{
		var categoryExists = await appDbContext.Categories
			.AsNoTracking()
			.AnyAsync(x => x.Name.ToUpper() == req.Name.ToUpper(), ct);

		if (categoryExists)
		{
			return TypedResults.BadRequest();
		}

		var category = new Category
		{
			Name = req.Name
		};

		await appDbContext.Categories.AddAsync(category, ct);
		await appDbContext.SaveChangesAsync(ct);

		var categoryDto = category.ToCategoryDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/categories/{categoryDto.Id}", categoryDto);
	}
}
