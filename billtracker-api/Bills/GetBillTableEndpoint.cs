using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills;

internal sealed record GetBillTableRequest
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

internal sealed class GetBillTableEndpoint(AppDbContext appDbContext) : Endpoint<GetBillTableRequest, Ok<PagedList<BillTableDto>>>
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

		if (!string.IsNullOrWhiteSpace(req.SearchQuery))
		{
			var capitalizedSearchQuery = req.SearchQuery.ToUpper();

			query = query.Where(x => x.BillNumber.Contains(capitalizedSearchQuery));
		}

		var bills = query.Select(x => x.ToBillTableDto());

		var billsTable = await PagedList<BillTableDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsTable);
	}
}
