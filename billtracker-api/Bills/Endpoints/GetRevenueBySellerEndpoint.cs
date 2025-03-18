using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed class GetRevenueBySellerEndpoint(AppDbContext appDbContext, TimeProvider timeProvider) : EndpointWithoutRequest<Ok<List<RevenueBySellerDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/revenue-by-seller");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override Task<Ok<List<RevenueBySellerDto>>> ExecuteAsync(CancellationToken ct)
	{
		var dateTimeNow = timeProvider.GetUtcNow();

		var revenueBySeller = appDbContext.Bills
			.Include(x => x.Seller)
			.Include(x => x.Items)
			.AsEnumerable()
			.Where(x => x.SellerId != null && x.Date.Year == dateTimeNow.Date.Year && x.Date.Month == dateTimeNow.Date.Month)
			.GroupBy(x => x.Seller!.GetFullName())
			.Select(x => new RevenueBySellerDto
			(
				x.Key,
				x.Sum(y => y.Items!.Sum(i => i.TotalPrice))
			))
			.OrderByDescending(x => x.TotalRevenue)
			.Take(5)
			.Reverse()
			.ToList();

		return Task.FromResult(TypedResults.Ok(revenueBySeller));
	}
}
