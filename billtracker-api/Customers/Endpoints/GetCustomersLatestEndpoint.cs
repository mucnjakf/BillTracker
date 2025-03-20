using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed class GetCustomersLatestEndpoint(AppDbContext appDbContext)
	: EndpointWithoutRequest<Ok<IEnumerable<CustomerListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/latest");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<IEnumerable<CustomerListDto>>> ExecuteAsync(CancellationToken ct)
	{
		var query = appDbContext.Customers
			.AsNoTracking();

		query = query
			.OrderByDescending(x => x.CreatedUtc)
			.Take(5);

		var customers = await query.ToListAsync(ct);

		var customersDtos = customers.Select(x => x.ToCustomerListDto());

		return TypedResults.Ok(customersDtos);
	}
}
