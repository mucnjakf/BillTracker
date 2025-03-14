using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Sellers.Endpoints;

internal sealed record UpdateSellerRequest
{
	[RouteParam]
	public int SellerId { get; init; }

	public string Name { get; init; } = null!;

	public string Surname { get; set; } = null!;

	public bool PermanentEmployee { get; set; }
}

internal sealed class UpdateSellerEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateSellerRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Sellers}/{{sellerId}}");
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(
		UpdateSellerRequest req,
		CancellationToken ct)
	{
		var seller = await appDbContext.Sellers.FindAsync([req.SellerId], cancellationToken: ct);

		if (seller is null)
		{
			return TypedResults.NotFound();
		}

		seller.Name = req.Name;
		seller.Surname = req.Surname;
		seller.PermanentEmployee = req.PermanentEmployee;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
