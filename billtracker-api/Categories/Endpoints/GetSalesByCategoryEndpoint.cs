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

	public override Task<Ok<List<SalesByCategoryDto>>> ExecuteAsync(CancellationToken ct)
	{
		var salesByCategory = appDbContext.Items
			.Include(x => x.Product)
			.ThenInclude(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.GroupBy(x => x.Product.SubCategory.Category.Name)
			.AsEnumerable()
			.Select(x => new SalesByCategoryDto
			(
				x.Key,
				x.Sum(i => i.TotalPrice)
			))
			.OrderByDescending(x => x.TotalSales)
			.Take(5)
			.Reverse()
			.ToList();

		return Task.FromResult(TypedResults.Ok(salesByCategory));
	}
}
