using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed record DeleteCustomerRequest
{
	[RouteParam]
	public int CustomerId { get; init; }
}

internal sealed class DeleteCustomerEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteCustomerRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles("User");
		Delete("/api/customers/{customerId}");
		Description(x => x.WithTags("Customers"));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteCustomerRequest req,
		CancellationToken ct)
	{
		var customer = await appDbContext.Customers
			.Include(x => x.Bills)
			.SingleOrDefaultAsync(x => x.Id == req.CustomerId, ct);

		if (customer is null)
		{
			return TypedResults.NotFound();
		}

		if (customer.Bills is not null && customer.Bills.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Customers.Remove(customer);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
