using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetSubCategoryProductsRequest
{
	[RouteParam]
	public int SubCategoryId { get; init; }
}

internal sealed class GetSubCategoryProductsEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSubCategoryProductsRequest, Ok<IEnumerable<ProductDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.SubCategories}/{{subCategoryId}}/products");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Ok<IEnumerable<ProductDto>>> ExecuteAsync(GetSubCategoryProductsRequest req, CancellationToken ct)
	{
		var products = await appDbContext.Products
			.AsNoTracking()
			.Include(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.Where(x => x.SubCategoryId == req.SubCategoryId)
			.ToListAsync(ct);

		var productsDto = products.Select(x => x.ToProductDto());

		return TypedResults.Ok(productsDto);
	}
}
