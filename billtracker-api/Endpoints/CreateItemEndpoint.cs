using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Entities;
using billtracker_api.Mappers;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record CreateItemRequest
{
	[RouteParam]
	public int BillId { get; set; }

	public int Quantity { get; set; }

	public int ProductId { get; set; }
}

internal sealed class CreateItemEndpoint(AppDbContext appDbContext) : Endpoint<CreateItemRequest, Results<Created<ItemDto>, NotFound>>
{
	public override void Configure()
	{
		Post("/api/bills/{billId}/items");
		AllowAnonymous();
		Description(x => x.WithTags("Items"));
	}

	public override async Task<Results<Created<ItemDto>, NotFound>> ExecuteAsync(CreateItemRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills.FindAsync([req.BillId], ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		var product = await appDbContext.Products.FindAsync([req.ProductId], ct);

		if (product is null)
		{
			return TypedResults.NotFound();
		}

		var item = new Item
		{
			Quantity = req.Quantity,
			TotalPrice = req.Quantity * product.Price,
			BillId = bill.Id,
			ProductId = product.Id
		};

		await appDbContext.Items.AddAsync(item, ct);
		await appDbContext.SaveChangesAsync(ct);

		item = await appDbContext.Items
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
			.SingleOrDefaultAsync(x => x.Id == item.Id, ct);

		var itemDto = item!.ToItemDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/bills/{bill.Id}/items/{itemDto.Id}", itemDto);
	}
}
