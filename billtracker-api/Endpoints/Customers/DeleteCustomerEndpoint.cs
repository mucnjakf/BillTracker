using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Endpoints.Customers;

internal sealed record DeleteCustomerRequest
{
	[RouteParam]
	public int CustomerId { get; set; }
}

internal sealed class DeleteCustomerEndpoint(AppDbContext appDbContext) : Endpoint<DeleteCustomerRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Delete("/api/customers/{customerId}");
		AllowAnonymous();
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(DeleteCustomerRequest req, CancellationToken ct)
	{
		var customer = await appDbContext.Customers.FindAsync([req.CustomerId], ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		appDbContext.Customers.Remove(customer);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
