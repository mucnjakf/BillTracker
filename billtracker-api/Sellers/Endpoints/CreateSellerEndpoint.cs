using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Sellers.Endpoints;

internal sealed record CreateSellerRequest(string Name, string Surname, bool PermanentEmployee);

internal sealed class CreateSellerEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateSellerRequest, Created<SellerDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Sellers);
		Description(x => x.WithTags(AppRouteTags.Sellers));
	}

	public override async Task<Created<SellerDto>> ExecuteAsync(CreateSellerRequest req, CancellationToken ct)
	{
		var seller = new Seller
		{
			Name = req.Name,
			Surname = req.Surname,
			PermanentEmployee = req.PermanentEmployee
		};

		await appDbContext.Sellers.AddAsync(seller, ct);
		await appDbContext.SaveChangesAsync(ct);

		var sellerDto = seller.ToSellerDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/sellers/{sellerDto.Id}", sellerDto);
	}
}
