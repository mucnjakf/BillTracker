using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed record DeleteSellerRequest
{
	[RouteParam]
	public int SellerId { get; init; }
}

internal sealed class DeleteSellerEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteSellerRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles("User");
		Delete("/api/sellers/{sellerId}");
		Description(x => x.WithTags("Sellers"));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteSellerRequest req,
		CancellationToken ct)
	{
		var seller = await appDbContext.Sellers
			.Include(x => x.Bills)
			.SingleOrDefaultAsync(x => x.Id == req.SellerId, ct);

		if (seller is null)
		{
			return TypedResults.NotFound();
		}

		if (seller.Bills is not null && seller.Bills.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Sellers.Remove(seller);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
