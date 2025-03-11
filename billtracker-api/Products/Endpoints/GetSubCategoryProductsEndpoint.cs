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
	: Endpoint<GetSubCategoryProductsRequest, Ok<IEnumerable<ProductListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/subcategories/{subCategoryId}/products");
		Description(x => x.WithTags("Products"));
	}

	public override async Task<Ok<IEnumerable<ProductListDto>>> ExecuteAsync(GetSubCategoryProductsRequest req, CancellationToken ct)
	{
		var products = await appDbContext.Products
			.AsNoTracking()
			.Where(x => x.SubCategoryId == req.SubCategoryId)
			.ToListAsync(ct);

		var productsDto = products.Select(x => x.ToProductListDto());

		return TypedResults.Ok(productsDto);
	}
}
