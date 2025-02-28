using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Entities;
using billtracker_api.Mappers;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Endpoints;

internal sealed record CreateCustomerRequest(
	string Name,
	string Surname,
	string Email,
	string Telephone,
	int? CityId);

internal sealed class CreateCustomerEndpoint(AppDbContext appDbContext) : Endpoint<CreateCustomerRequest, Created<CustomerDto>>
{
	public override void Configure()
	{
		Post("/api/customers");
		AllowAnonymous();
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
