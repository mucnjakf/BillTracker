using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record CreateItemRequest
{
	public int BillId { get; init; }

	public int Quantity { get; init; }

	public int ProductId { get; init; }
}

internal sealed class CreateItemEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateItemRequest, Results<Created<ItemDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Items);
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override async Task<Results<Created<ItemDto>, NotFound>> ExecuteAsync(
		CreateItemRequest req,
		CancellationToken ct)
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
			.Include(x => x.Product)
			.ThenInclude(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.SingleOrDefaultAsync(x => x.Id == item.Id, ct);

		var itemDto = item!.ToItemDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/bills/{bill.Id}/items/{itemDto.Id}", itemDto);
	}
}
