using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed class GetSellersAllEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<SellerDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.Sellers);
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Ok<IEnumerable<SellerDto>>> ExecuteAsync(CancellationToken ct)
	{
		var sellers = await appDbContext.Sellers
			.AsNoTracking()
			.ToListAsync(ct);

		var sellersDto = sellers.Select(x => x.ToSellerDto());

		return TypedResults.Ok(sellersDto);
	}
}
