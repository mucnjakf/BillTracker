using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetSubCategoryLatestRequest
{
	[QueryParam]
	public int? CategoryId { get; init; }
}

internal sealed class GetSubCategoriesLatestEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoryLatestRequest, Ok<IEnumerable<SubCategoryListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.SubCategories}/latest");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<IEnumerable<SubCategoryListDto>>> ExecuteAsync(GetSubCategoryLatestRequest req, CancellationToken ct)
	{
		var query = appDbContext.SubCategories
			.AsNoTracking();

		if (req.CategoryId is not null)
		{
			query = query.Where(x => x.CategoryId == req.CategoryId);
		}

		query = query
			.OrderByDescending(x => x.CreatedUtc)
			.Take(10);

		var subCategories = await query.ToListAsync(ct);

		var subCategoryDtos = subCategories.Select(x => x.ToSubCategoryListDto());

		return TypedResults.Ok(subCategoryDtos);
	}
}
