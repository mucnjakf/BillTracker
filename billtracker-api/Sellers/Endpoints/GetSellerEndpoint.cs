using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed record GetSellerRequest
{
	[RouteParam]
	public int SellerId { get; init; }
}

internal sealed class GetSellerEndpoint(AppDbContext appDbContext)
	: Endpoint<GetSellerRequest, Results<Ok<SellerDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Sellers}/{{sellerId}}");
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Results<Ok<SellerDto>, NotFound>> ExecuteAsync(
		GetSellerRequest req,
		CancellationToken ct)
	{
		var seller = await appDbContext.Sellers
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Id == req.SellerId, ct);

		if (seller is null)
		{
			return TypedResults.NotFound();
		}

		var sellerDto = seller.ToSellerDto();

		return TypedResults.Ok(sellerDto);
	}
}
