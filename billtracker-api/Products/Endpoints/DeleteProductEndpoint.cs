using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record DeleteProductRequest
{
	[RouteParam]
	public int ProductId { get; init; }

	[QueryParam]
	public int? SubCategoryId { get; init; }
}

internal sealed class DeleteProductEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteProductRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Products}/{{productId}}");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteProductRequest req,
		CancellationToken ct)
	{
		var product = await appDbContext.Products
			.Include(x => x.Items)
			.SingleOrDefaultAsync(x => x.Id == req.ProductId, ct);

		if (product is null)
		{
			return TypedResults.NotFound();
		}

		if (req.SubCategoryId is not null && product.SubCategoryId != req.SubCategoryId)
		{
			return TypedResults.NotFound();
		}

		if (product.Items is not null && product.Items.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Products.Remove(product);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
