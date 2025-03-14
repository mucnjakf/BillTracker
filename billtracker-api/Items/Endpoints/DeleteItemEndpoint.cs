using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Items.Endpoints;

internal sealed record DeleteItemRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[RouteParam]
	public int ItemId { get; init; }
}

internal sealed class DeleteItemEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteItemRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Bills}/{{billId}}/items/{{itemId}}");
		Description(x => x.WithTags(AppRouteTags.Items));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(DeleteItemRequest req, CancellationToken ct)
	{
		var item = await appDbContext.Items
			.SingleOrDefaultAsync(x => x.BillId == req.BillId && x.Id == req.ItemId, ct);

		if (item is null)
		{
			return TypedResults.NotFound();
		}

		appDbContext.Remove(item);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
