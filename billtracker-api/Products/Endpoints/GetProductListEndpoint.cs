using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetProductListRequest
{
	[QueryParam]
	public int? SubCategoryId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetProductListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetProductListRequest, Ok<PagedList<ProductListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Products}/list");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Ok<PagedList<ProductListDto>>> ExecuteAsync(GetProductListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Products
			.AsNoTracking();

		if (req.SubCategoryId is not null)
		{
			query = query.Where(x => x.SubCategoryId == req.SubCategoryId);
		}

		var products = query.Select(x => x.ToProductListDto());

		var productsList = await PagedList<ProductListDto>.ToPagedListAsync(products, req.PageNumber, req.PageSize);

		return TypedResults.Ok(productsList);
	}
}
