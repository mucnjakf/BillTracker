using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed record GetCustomerTableRequest
{
	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;

	[QueryParam]
	public string? SortBy { get; init; } = null;
}

internal sealed class GetCustomerTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerTableRequest, Ok<PagedList<CustomerTableDto>>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Get($"{AppRoutes.Customers}/table");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<PagedList<CustomerTableDto>>> ExecuteAsync(
		GetCustomerTableRequest req,
		CancellationToken ct)
	{
		IQueryable<Customer> query = appDbContext.Customers
			.AsNoTracking()
			.Include(x => x.Bills)
			.Include(x => x.City);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var customers = query.Select(x => x.ToCustomerTableDto());

		var customersTable = await PagedList<CustomerTableDto>
			.ToPagedListAsync(customers, req.PageNumber, req.PageSize);

		return TypedResults.Ok(customersTable);
	}

	private static IQueryable<Customer> Search(string? searchQuery, IQueryable<Customer> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x =>
			x.Name.ToUpper().Contains(capitalSearchQuery) || x.Surname.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Customer> Sort(string? sortBy, IQueryable<Customer> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"surname-asc" => query.OrderBy(x => x.Surname),
			"surname-desc" => query.OrderByDescending(x => x.Surname),
			"billsCount-asc" => query.OrderBy(x => x.Bills!.Count()),
			"billsCount-desc" => query.OrderByDescending(x => x.Bills!.Count()),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
