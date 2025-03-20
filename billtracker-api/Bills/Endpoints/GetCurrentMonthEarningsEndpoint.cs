using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed class GetCurrentMonthEarningsEndpoint(AppDbContext appDbContext, TimeProvider timeProvider)
	: EndpointWithoutRequest<Ok<CurrentMonthEarningsDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/current-month-earnings");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<CurrentMonthEarningsDto>> ExecuteAsync(CancellationToken ct)
	{
		var earnings = await appDbContext.Bills
			.Include(x => x.Items)
			.Where(x => x.Date.Month == timeProvider.GetUtcNow().Month && x.Date.Year == timeProvider.GetUtcNow().Year)
			.SumAsync(x => x.Items!.Sum(y => y.TotalPrice), cancellationToken: ct);

		return TypedResults.Ok(new CurrentMonthEarningsDto(earnings));
	}
}
