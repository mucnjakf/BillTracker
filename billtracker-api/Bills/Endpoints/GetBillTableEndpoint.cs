using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetBillTableRequest
{
	[RouteParam]
	public int CustomerId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;

	[QueryParam]
	public string? SortBy { get; init; } = null;
}

internal sealed class GetBillTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillTableRequest, Ok<PagedList<BillTableDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/customers/{customerId}/bills/table");
		Description(x => x.WithTags("Bills"));
	}

	public override async Task<Ok<PagedList<BillTableDto>>> ExecuteAsync(GetBillTableRequest req, CancellationToken ct)
	{
		var query = appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Items)
			.Where(x => x.CustomerId == req.CustomerId);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var bills = query.Select(x => x.ToBillTableDto());

		var billsTable = await PagedList<BillTableDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsTable);
	}

	private static IQueryable<Bill> Search(string? searchQuery, IQueryable<Bill> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalizedSearchQuery = searchQuery.ToUpper();

		query = query.Where(x => x.BillNumber.Contains(capitalizedSearchQuery));

		return query;
	}

	private static IQueryable<Bill> Sort(string? sortBy, IQueryable<Bill> query)
	{
		return sortBy switch
		{
			"date-asc" => query.OrderBy(x => x.Date),
			"date-desc" => query.OrderByDescending(x => x.Date),
			"number-asc" => query.OrderBy(x => x.BillNumber),
			"number-desc" => query.OrderByDescending(x => x.BillNumber),
			_ => query.OrderBy(x => x.Date)
		};
	}
}
