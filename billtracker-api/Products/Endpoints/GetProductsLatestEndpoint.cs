using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record GetProductsLatestRequest
{
	[QueryParam]
	public int? SubCategoryId { get; init; }
}

internal sealed class GetProductsLatestEndpoint(AppDbContext appDbContext)
	: Endpoint<GetProductsLatestRequest, Ok<IEnumerable<ProductListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Products}/latest");
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Ok<IEnumerable<ProductListDto>>> ExecuteAsync(GetProductsLatestRequest req, CancellationToken ct)
	{
		var query = appDbContext.Products
			.AsNoTracking();

		if (req.SubCategoryId is not null)
		{
			query = query.Where(x => x.SubCategoryId == req.SubCategoryId);
		}

		query = query
			.OrderByDescending(x => x.CreatedUtc)
			.Take(10);

		var products = await query.ToListAsync(ct);

		var productsDtos = products.Select(x => x.ToProductListDto());

		return TypedResults.Ok(productsDtos);
	}
}
