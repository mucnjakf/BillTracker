using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record UpdateItemRequest
{
	[RouteParam]
	public int ItemId { get; init; }

	[QueryParam]
	public int? BillId { get; init; }
	
	public int Quantity { get; init; }
}

internal sealed class UpdateItemEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateItemRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Items}/{{itemId}}");
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(UpdateItemRequest req, CancellationToken ct)
	{
		var item = await appDbContext.Items
			.Include(x => x.Product)
			.SingleOrDefaultAsync(x => x.Id == req.ItemId, ct);

		if (item is null)
		{
			return TypedResults.NotFound();
		}

		if (req.BillId is not null && item.BillId != req.BillId)
		{
			return TypedResults.NotFound();
		}

		item.Quantity = req.Quantity;
		item.TotalPrice = req.Quantity * item.Product.Price;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
