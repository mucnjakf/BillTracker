using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed class GetSellersEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<SellerListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/sellers");
		Description(x => x.WithTags("Sellers"));
	}

	public override async Task<Ok<IEnumerable<SellerListDto>>> ExecuteAsync(CancellationToken ct)
	{
		var sellers = await appDbContext.Sellers.ToListAsync(ct);

		var sellersDto = sellers.Select(x => x.ToSellerListDto());

		return TypedResults.Ok(sellersDto);
	}
}
