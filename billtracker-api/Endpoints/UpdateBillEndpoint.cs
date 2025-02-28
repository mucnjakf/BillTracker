using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record UpdateBillRequest
{
	[RouteParam]
	public int CustomerId { get; set; }

	[RouteParam]
	public int BillId { get; set; }

	public DateTimeOffset Date { get; set; }

	public string Comment { get; set; } = null!;
}

internal sealed class UpdateBillEndpoint(AppDbContext appDbContext) : Endpoint<UpdateBillRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles("User");
		Put("/api/customers/{customerId}/bills/{billId}");
		Description(x => x.WithTags("Bills"));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(UpdateBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		bill.Date = req.Date;
		bill.Comment = req.Comment;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
