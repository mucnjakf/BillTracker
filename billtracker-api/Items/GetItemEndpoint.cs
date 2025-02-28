using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items;

internal sealed record GetItemRequest
{
	[RouteParam]
	public int BillId { get; set; }

	[RouteParam]
	public int ItemId { get; set; }
}

internal sealed class GetItemEndpoint(AppDbContext appDbContext) : Endpoint<GetItemRequest, Results<Ok<ItemDto>, NotFound>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/bills/{billId}/items/{itemId}");
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Results<Ok<ItemDto>, NotFound>> ExecuteAsync(GetItemRequest req, CancellationToken ct)
	{
		var item = await appDbContext.Items
			.AsNoTracking()
			.Include(x => x.Bill)
			.ThenInclude(x => x.Customer)
			.Include(x => x.Bill)
			.ThenInclude(x => x.Seller)
			.Include(x => x.Bill)
			.ThenInclude(x => x.CreditCard)
			.Include(x => x.Product)
			.ThenInclude(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.SingleOrDefaultAsync(x => x.BillId == req.BillId && x.Id == req.ItemId, ct);

		if (item is null)
		{
			return TypedResults.NotFound();
		}

		var itemDto = item.ToItemDto();

		return TypedResults.Ok(itemDto);
	}
}
