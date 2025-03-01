using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills;

internal sealed record DeleteBillRequest
{
	[RouteParam]
	public int CustomerId { get; init; }

	[RouteParam]
	public int BillId { get; init; }
}

internal sealed class DeleteBillEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteBillRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles("User");
		Delete("/api/customers/{customerId}/bills/{billId}");
		Description(x => x.WithTags("Bills"));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(DeleteBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills
			.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		appDbContext.Bills.Remove(bill);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
