using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record UpdateItemRequest
{
	[RouteParam]
	public int BillId { get; set; }

	[RouteParam]
	public int ItemId { get; set; }

	public int Quantity { get; set; }
}

internal sealed class UpdateItemEndpoint(AppDbContext appDbContext) : Endpoint<UpdateItemRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Put("/api/bills/{billId}/items/{itemId}");
		AllowAnonymous();
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(UpdateItemRequest req, CancellationToken ct)
	{
		var item = await appDbContext.Items
			.Include(x => x.Product)
			.SingleOrDefaultAsync(x => x.BillId == req.BillId && x.Id == req.ItemId, ct);

		if (item is null)
		{
			return TypedResults.NotFound();
		}

		item.Quantity = req.Quantity;
		item.TotalPrice = req.Quantity * item.Product.Price;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
