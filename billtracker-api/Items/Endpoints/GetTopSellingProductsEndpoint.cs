using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed class GetTopSellingProductsEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<List<TopSellingProductsDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Items}/top-selling-products");
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override Task<Ok<List<TopSellingProductsDto>>> ExecuteAsync(CancellationToken ct)
	{
		var topSellingProducts = appDbContext.Items
			.Include(x => x.Product)
			.AsEnumerable()
			.GroupBy(x => x.Product.Name)
			.Select(x => new TopSellingProductsDto
			(
				x.Key,
				x.Sum(y => y.Quantity)
			))
			.OrderByDescending(x => x.QuantitySold)
			.Take(5)
			.ToList();


		return Task.FromResult(TypedResults.Ok(topSellingProducts));
	}
}