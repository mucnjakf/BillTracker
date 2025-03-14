using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record DeleteBillRequest
{
	[RouteParam]
	public int CustomerId { get; init; }

	[RouteParam]
	public int BillId { get; init; }
}

internal sealed class DeleteBillEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteBillRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Customers}/{{customerId}}/bills/{{billId}}");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(DeleteBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills
			.Include(x => x.Items)
			.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		if (bill.Items is not null && bill.Items.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Bills.Remove(bill);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
