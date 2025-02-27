using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Entities;
using billtracker_api.Mappers;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints.Customers;

internal sealed record GetCustomerTableRequest
{
	[QueryParam]
	public int PageNumber { get; set; } = 1;

	[QueryParam]
	public int PageSize { get; set; } = 10;

	[QueryParam]
	public string? SearchQuery { get; set; } = null;
}

internal sealed class GetCustomerTableEndpoint(AppDbContext appDbContext) : Endpoint<GetCustomerTableRequest, Ok<PagedList<CustomerTableDto>>>
{
	public override void Configure()
	{
		Get("/api/customers/table");
		AllowAnonymous();
	}

	public override async Task<Ok<PagedList<CustomerTableDto>>> ExecuteAsync(GetCustomerTableRequest req, CancellationToken ct)
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

		var customersTable = await PagedList<CustomerTableDto>.ToPagedListAsync(customers, req.PageNumber, req.PageSize);

		return TypedResults.Ok(customersTable);
	}
}
