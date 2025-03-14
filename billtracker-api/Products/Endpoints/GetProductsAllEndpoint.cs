using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetProductsAllRequest
{
	[QueryParam]
	public int? SubCategoryId { get; init; }
}

internal sealed class GetProductsAllEndpoint(AppDbContext appDbContext)
	: Endpoint<GetProductsAllRequest, Ok<IEnumerable<ProductDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.Products);
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Ok<IEnumerable<ProductDto>>> ExecuteAsync(GetProductsAllRequest req, CancellationToken ct)
	{
		IQueryable<Product> query = appDbContext.Products
			.AsNoTracking()
			.Include(x => x.SubCategory)
			.ThenInclude(x => x.Category);

		if (req.SubCategoryId is not null)
		{
			query = query.Where(x => x.SubCategoryId == req.SubCategoryId);
		}

		var products = await query.ToListAsync(ct);

		var productsDto = products.Select(x => x.ToProductDto());

		return TypedResults.Ok(productsDto);
	}
}
