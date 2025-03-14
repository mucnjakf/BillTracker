using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetSubCategoriesAllRequest
{
	[QueryParam]
	public int? CategoryId { get; init; }
}

internal sealed class GetSubCategoriesAllEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoriesAllRequest, Ok<IEnumerable<SubCategoryDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.SubCategories);
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<IEnumerable<SubCategoryDto>>> ExecuteAsync(GetSubCategoriesAllRequest req, CancellationToken ct)
	{
		IQueryable<SubCategory> query = appDbContext.SubCategories
			.AsNoTracking()
			.Include(x => x.Category);

		if (req.CategoryId is not null)
		{
			query = query.Where(x => x.CategoryId == req.CategoryId);
		}

		var subCategories = await query.ToListAsync(ct);

		var subCategoriesDto = subCategories.Select(x => x.ToSubCategoryDto());

		return TypedResults.Ok(subCategoriesDto);
	}
}
