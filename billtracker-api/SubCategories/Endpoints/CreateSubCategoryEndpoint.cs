using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record CreateSubCategoryRequest(
	string Name,
	int CategoryId);

internal sealed class CreateSubCategoryEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateSubCategoryRequest, Results<Created<SubCategoryDto>, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.SubCategories);
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Results<Created<SubCategoryDto>, NotFound, BadRequest>> ExecuteAsync(CreateSubCategoryRequest req, CancellationToken ct)
	{
		var category = await appDbContext.Categories
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Id == req.CategoryId, ct);

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

		var subCategory = new SubCategory
		{
			Name = req.Name,
			CategoryId = category.Id
		};

		await appDbContext.SubCategories.AddAsync(subCategory, ct);
		await appDbContext.SaveChangesAsync(ct);

		subCategory = await appDbContext.SubCategories
			.AsNoTracking()
			.Include(x => x.Category)
			.SingleOrDefaultAsync(x => x.Id == subCategory.Id, ct);

		var subCategoryDto = subCategory!.ToSubCategoryDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/subcategories/{subCategoryDto.Id}", subCategoryDto);
	}
}
