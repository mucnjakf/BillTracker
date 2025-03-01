using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items;

internal sealed record GetItemTableRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;
}

internal sealed class GetItemTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetItemTableRequest, Ok<PagedList<ItemTableDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/bills/{billId}/items/table");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Ok<PagedList<ItemTableDto>>> ExecuteAsync(GetItemTableRequest req, CancellationToken ct)
	{
		var query = appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product)
			.Where(x => x.BillId == req.BillId);

		if (!string.IsNullOrWhiteSpace(req.SearchQuery))
		{
			var capitalizedSearchQuery = req.SearchQuery.ToUpper();

			query = query.Where(x => x.Product.Name.Contains(capitalizedSearchQuery));
		}

		var items = query.Select(x => x.ToItemTableDto());

		var itemsTable = await PagedList<ItemTableDto>
			.ToPagedListAsync(items, req.PageNumber, req.PageSize);

		return TypedResults.Ok(itemsTable);
	}
}
