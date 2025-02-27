using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Mappers;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints.Customers.Bills;

internal sealed record GetCustomerBillsRequest
{
	[RouteParam]
	public int CustomerId { get; set; }

	[QueryParam]
	public int PageNumber { get; set; } = 1;

	[QueryParam]
	public int PageSize { get; set; } = 10;

	[QueryParam]
	public string? SearchQuery { get; set; } = null;
}

internal sealed class GetCustomerBillsTableEndpoint(AppDbContext appDbContext) : Endpoint<GetCustomerBillsRequest, Ok<PagedList<CustomerBillTableDto>>>
{
	public override void Configure()
	{
		Get("/api/customers/{customerId}/bills/table");
		AllowAnonymous();
	}

	public override async Task<Ok<PagedList<CustomerBillTableDto>>> ExecuteAsync(GetCustomerBillsRequest req, CancellationToken ct)
	{
		var query = appDbContext.Bills
			.AsNoTracking()
			.Where(x => x.CustomerId == req.CustomerId);

		if (!string.IsNullOrWhiteSpace(req.SearchQuery))
		{
			var capitalizedSearchQuery = req.SearchQuery.ToUpper();

			query = query.Where(x => x.BillNumber.Contains(capitalizedSearchQuery));
		}

		var bills = query.Select(x => x.ToCustomerBillTableDto());
		
		var billsTable = await PagedList<CustomerBillTableDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);
		
		return TypedResults.Ok(billsTable);
	}
}