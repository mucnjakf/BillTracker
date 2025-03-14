using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Customers.Endpoints;

internal sealed record CreateCustomerRequest(
	string Name,
	string Surname,
	string Email,
	string Telephone,
	int? CityId);

internal sealed class CreateCustomerEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateCustomerRequest, Created<CustomerDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Customers);
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Created<CustomerDto>> ExecuteAsync(CreateCustomerRequest req, CancellationToken ct)
	{
		var city = await appDbContext.Cities.FindAsync([req.CityId], cancellationToken: ct);

		var customer = new Customer
		{
			Name = req.Name,
			Surname = req.Surname,
			Email = req.Email,
			Telephone = req.Telephone,
			CityId = city?.Id
		};

		await appDbContext.Customers.AddAsync(customer, ct);
		await appDbContext.SaveChangesAsync(ct);

		var customerDto = customer.ToCustomerDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/customers/{customerDto.Id}", customerDto);
	}
}
