using billtracker_api.Auth;
using billtracker_api.Customers;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetBillTableRequest
{
	[QueryParam]
	public int? CustomerId { get; init; }

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
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/table");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<PagedList<BillTableDto>>> ExecuteAsync(GetBillTableRequest req, CancellationToken ct)
	{
		IQueryable<Bill> query = appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Customer)
			.Include(x => x.Seller)
			.Include(x => x.Items);

		if (req.CustomerId is not null)
		{
			query = query.Where(x => x.CustomerId == req.CustomerId);
		}

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var bills = query.Select(x => x.ToBillTableDto());

		var billsTable = await PagedList<BillTableDto>
			.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsTable);
	}

	private static IQueryable<Bill> Search(string? searchQuery, IQueryable<Bill> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x => x.BillNumber.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<Bill> Sort(string? sortBy, IQueryable<Bill> query)
	{
		return sortBy switch
		{
			"date-asc" => query.OrderBy(x => x.Date),
			"date-desc" => query.OrderByDescending(x => x.Date),
			"itemsCount-asc" => query.OrderBy(x => x.Items!.Count()),
			"itemsCount-desc" => query.OrderByDescending(x => x.Items!.Count()),
			"total-asc" => query.OrderBy(x => x.Items!.Sum(y => y.TotalPrice)),
			"total-desc" => query.OrderByDescending(x => x.Items!.Sum(y => y.TotalPrice)),
			_ => query.OrderByDescending(x => x.Date)
		};
	}
}
