using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed class GetSellersLatestEndpoint(AppDbContext appDbContext)
	: EndpointWithoutRequest<Ok<IEnumerable<SellerListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Sellers}/latest");
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Ok<IEnumerable<SellerListDto>>> ExecuteAsync(CancellationToken ct)
	{
		var query = appDbContext.Sellers
			.AsNoTracking();

		query = query
			.OrderByDescending(x => x.CreatedUtc)
			.Take(5);

		var sellers = await query.ToListAsync(ct);

		var sellersDtos = sellers.Select(x => x.ToSellerListDto());

		return TypedResults.Ok(sellersDtos);
	}
}