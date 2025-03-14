using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record GetItemRequest
{
	[QueryParam]
	public int? BillId { get; init; }

	[RouteParam]
	public int ItemId { get; init; }
}

internal sealed class GetItemEndpoint(AppDbContext appDbContext)
	: Endpoint<GetItemRequest, Results<Ok<ItemDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Items}/{{itemId}}");
		Description(x => x.WithTags(AppRouteTags.Items));
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
			.SingleOrDefaultAsync(x => x.Id == req.ItemId, ct);

		if (item is null)
		{
			return TypedResults.NotFound();
		}

		if (req.BillId is not null && item.BillId != req.BillId)
		{
			return TypedResults.NotFound();
		}

		var itemDto = item.ToItemDto();

		return TypedResults.Ok(itemDto);
	}
}
