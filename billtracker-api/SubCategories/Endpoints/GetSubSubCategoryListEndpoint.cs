using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.SubCategories.Endpoints;

internal sealed record GetSubCategoryListRequest
{
	[QueryParam]
	public int? CategoryId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetSubCategoryListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoryListRequest, Ok<PagedList<SubCategoryListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.SubCategories}/list");
		Description(x => x.WithTags(AppRouteTags.SubCategories));
	}

	public override async Task<Ok<PagedList<SubCategoryListDto>>> ExecuteAsync(GetSubCategoryListRequest req, CancellationToken ct)
	{
		var query = appDbContext.SubCategories
			.AsNoTracking();

		if (req.CategoryId is not null)
		{
			query = query.Where(x => x.CategoryId == req.CategoryId);
		}

		var subCategories = query.Select(x => x.ToSubCategoryListDto());

		var subCategoriesList = await PagedList<SubCategoryListDto>.ToPagedListAsync(subCategories, req.PageNumber, req.PageSize);

		return TypedResults.Ok(subCategoriesList);
	}
}
