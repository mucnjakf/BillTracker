using System.Globalization;
using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed class GetBillActivityEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<List<BillActivityDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/bill-activity");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override Task<Ok<List<BillActivityDto>>> ExecuteAsync(CancellationToken ct)
	{
		var billActivity = appDbContext.Bills
			.AsEnumerable()
			.GroupBy(x => x.Date.Date)
			.Select(x => new BillActivityDto
			(
				x.Key.ToString(CultureInfo.InvariantCulture),
				x.Count()
			))
			.OrderByDescending(x => DateTime.Parse(x.Date))
			.Take(5)
			.Reverse()
			.ToList();

		return Task.FromResult(TypedResults.Ok(billActivity));
	}
}
