using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Categories.Endpoints;

internal sealed class GetSalesByCategoryEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<List<SalesByCategoryDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Categories}/sales-by-category");
		Description(x => x.WithTags(AppRouteTags.Categories));
	}

	public override async Task<Ok<List<SalesByCategoryDto>>> ExecuteAsync(CancellationToken ct)
	{
		var salesByCategory = appDbContext.Items
			.GroupBy(x => x.Product.SubCategory.Category.Name)
			.AsEnumerable()
			.Select(x => new SalesByCategoryDto
			(
				x.Key,
				x.Sum(i => i.TotalPrice)
			))
			.OrderByDescending(x => x.TotalSales)
			.Take(5)
			.ToList();

		return TypedResults.Ok(salesByCategory);
	}
}
