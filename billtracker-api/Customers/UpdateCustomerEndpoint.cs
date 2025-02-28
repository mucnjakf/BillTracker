using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace billtracker_api.Customers;

internal sealed record UpdateCustomerRequest
{
	[FromRoute]
	public int CustomerId { get; set; }

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string Telephone { get; set; } = null!;

	public int? CityId { get; set; }
}

internal sealed class UpdateCustomerEndpoint(AppDbContext appDbContext) : Endpoint<UpdateCustomerRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles("User");
		Put("/api/customers/{customerId}");
		Description(x => x.WithTags("Customers"));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(UpdateCustomerRequest req, CancellationToken ct)
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
