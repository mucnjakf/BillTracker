using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed class GetSalesTrendOverTimeEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<List<SalesTrendOverTimeDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/sales-trend-over-time");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override Task<Ok<List<SalesTrendOverTimeDto>>> ExecuteAsync(CancellationToken ct)
	{
		var salesTrendOverTime = appDbContext.Bills
			.Include(x => x.Items)
			.AsEnumerable()
			.GroupBy(x => x.Date.Date)
			.Select(x => new SalesTrendOverTimeDto(
				x.Key.ToString("dd. MM. yyyy."),
				x.Sum(y => y.Items!.Sum(z => z.TotalPrice))))
			.OrderByDescending(x => x.Date)
			.Take(5)
			.Reverse()
			.ToList();

		return Task.FromResult(TypedResults.Ok(salesTrendOverTime));
	}
}
