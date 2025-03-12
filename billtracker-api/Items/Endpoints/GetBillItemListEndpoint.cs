using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetBillItemListRequest
{
	[RouteParam]
	public int BillId { get; init; }
}

internal sealed class GetBillItemListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetBillItemRequest, Ok<IEnumerable<ItemListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/bills/{billId}/items/list");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Ok<IEnumerable<ItemListDto>>> ExecuteAsync(GetBillItemRequest req, CancellationToken ct)
	{
		var query = await appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Product)
			.Where(x => x.BillId == req.BillId)
			.ToListAsync(ct);

		var itemsList = query.Select(x => x.ToItemListDto());

		return TypedResults.Ok(itemsList);
	}
}
