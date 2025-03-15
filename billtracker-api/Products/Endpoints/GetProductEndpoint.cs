using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetProductRequest
{
	[RouteParam]
	public int ProductId { get; init; }

	[QueryParam]
	public int? SubCategoryId { get; init; }
}

internal sealed class GetProductEndpoint(AppDbContext appDbContext)
	: Endpoint<GetProductRequest, Results<Ok<ProductDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Products}/{{productId}}");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Results<Ok<ProductDto>, NotFound>> ExecuteAsync(
		GetProductRequest req,
		CancellationToken ct)
	{
		var product = await appDbContext.Products
			.AsNoTracking()
			.Include(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.SingleOrDefaultAsync(x => x.Id == req.ProductId, ct);

		if (product is null)
		{
			return TypedResults.NotFound();
		}

		if (req.SubCategoryId is not null && product.SubCategoryId != req.SubCategoryId)
		{
			return TypedResults.NotFound();
		}

		var productDto = product.ToProductDto();

		return TypedResults.Ok(productDto);
	}
}
