using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed record GetCustomerRequest
{
	[RouteParam]
	public int CustomerId { get; init; }
}

internal sealed class GetCustomerEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerRequest, Results<Ok<CustomerDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/{{customerId}}");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Results<Ok<CustomerDto>, NotFound>> ExecuteAsync(
		GetCustomerRequest req,
		CancellationToken ct)
	{
		var customer = await appDbContext.Customers
			.AsNoTracking()
			.Include(x => x.City)
			.SingleOrDefaultAsync(x => x.Id == req.CustomerId, ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		var customerDto = customer.ToCustomerDto();

		return TypedResults.Ok(customerDto);
	}
}
