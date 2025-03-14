using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Customers.Endpoints;

internal sealed record UpdateCustomerRequest
{
	[RouteParam]
	public int CustomerId { get; init; }

	public string Name { get; init; } = null!;

	public string Surname { get; init; } = null!;

	public string Email { get; init; } = null!;

	public string Telephone { get; init; } = null!;

	public int? CityId { get; init; }
}

internal sealed class UpdateCustomerEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateCustomerRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Customers}/{{customerId}}");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(
		UpdateCustomerRequest req,
		CancellationToken ct)
	{
		var customer = await appDbContext.Customers.FindAsync([req.CustomerId], cancellationToken: ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		var city = await appDbContext.Cities.FindAsync([req.CityId], cancellationToken: ct);

		customer.Name = req.Name;
		customer.Surname = req.Surname;
		customer.Email = req.Email;
		customer.Telephone = req.Telephone;
		customer.CityId = city?.Id;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
