using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed class GetTotalSellersCountEndpoint(AppDbContext appDbContext)
	: EndpointWithoutRequest<Ok<TotalSellersCountDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Sellers}/total-count");
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Ok<TotalSellersCountDto>> ExecuteAsync(CancellationToken ct)
	{
		var totalSellers = await appDbContext.Sellers
			.CountAsync(ct);

		return TypedResults.Ok(new TotalSellersCountDto(totalSellers));
	}
}