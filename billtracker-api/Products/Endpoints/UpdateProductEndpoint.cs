using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Products.Endpoints;

internal sealed record UpdateProductRequest
{
	[RouteParam]
	public int ProductId { get; init; }

	[QueryParam]
	public int? SubCategoryId { get; set; }

	public string Name { get; init; } = null!;

	public string ProductNumber { get; set; } = null!;

	public string Color { get; set; } = null!;

	public decimal Price { get; set; }
}

internal sealed class UpdateProductEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateProductRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Products}/{{productId}}");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(
		UpdateProductRequest req,
		CancellationToken ct)
	{
		var product = await appDbContext.Products.FindAsync([req.ProductId], cancellationToken: ct);

		if (product is null)
		{
			return TypedResults.NotFound();
		}

		if (req.SubCategoryId is not null && product.SubCategoryId != req.SubCategoryId)
		{
			return TypedResults.NotFound();
		}

		product.Name = req.Name;
		product.ProductNumber = req.ProductNumber;
		product.Color = req.Color;
		product.Price = req.Price;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
