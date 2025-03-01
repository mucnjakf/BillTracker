using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers;

internal sealed record GetCustomerTableRequest
{
	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;
}

internal sealed class GetCustomerTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerTableRequest, Ok<PagedList<CustomerTableDto>>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Get("/api/customers/table");
		Description(x => x.WithTags("Customers"));
	}

	public override async Task<Ok<PagedList<CustomerTableDto>>> ExecuteAsync(
		GetCustomerTableRequest req,
		CancellationToken ct)
	{
		IQueryable<Customer> query = appDbContext.Customers
			.AsNoTracking()
			.Include(x => x.City);

		if (!string.IsNullOrWhiteSpace(req.SearchQuery))
		{
			var capitalSearchQuery = req.SearchQuery.ToUpper();

			query = query.Where(x => x.Name.ToUpper().Contains(capitalSearchQuery));
		}

		var customers = query.Select(x => x.ToCustomerTableDto());

		var customersTable = await PagedList<CustomerTableDto>
			.ToPagedListAsync(customers, req.PageNumber, req.PageSize);

		return TypedResults.Ok(customersTable);
	}
}
