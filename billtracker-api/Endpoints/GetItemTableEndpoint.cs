using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Entities;
using billtracker_api.Mappers;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record GetItemTableRequest
{
	[RouteParam]
	public int BillId { get; set; }

	[QueryParam]
	public int PageNumber { get; set; } = 1;

	[QueryParam]
	public int PageSize { get; set; } = 10;

	[QueryParam]
	public string? SearchQuery { get; set; } = null;
}

internal sealed class GetItemTableEndpoint(AppDbContext appDbContext) : Endpoint<GetItemTableRequest, Ok<PagedList<ItemTableDto>>>
{
	public override void Configure()
	{
		Get("/api/bills/{billId}/items/table");
		AllowAnonymous();
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

		var itemsTable = await PagedList<ItemTableDto>.ToPagedListAsync(items, req.PageNumber, req.PageSize);

		return TypedResults.Ok(itemsTable);
	}
}
