using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed class GetCustomersByCityEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<List<CustomersByCityDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/customers-by-city");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override Task<Ok<List<CustomersByCityDto>>> ExecuteAsync(CancellationToken ct)
	{
		var customersByCity = appDbContext.Customers
			.Include(x => x.City)
			.AsEnumerable()
			.GroupBy(x => x.City?.Name ?? "No city")
			.Select(x => new CustomersByCityDto
			(
				x.Key,
				x.Count()
			))
			.OrderByDescending(x => x.CustomerCount)
			.Take(6)
			.ToList();

		return Task.FromResult(TypedResults.Ok(customersByCity));
	}
}
