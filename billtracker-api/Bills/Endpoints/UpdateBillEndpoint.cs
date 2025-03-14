using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record UpdateBillRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[QueryParam]
	public int? CustomerId { get; init; }

	public DateTimeOffset Date { get; init; }

	public string Comment { get; init; } = null!;
}

internal sealed class UpdateBillEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateBillRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Bills}/{{billId}}");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(UpdateBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills.FindAsync([req.BillId], ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		if (req.CustomerId is not null && bill.CustomerId != req.CustomerId)
		{
			return TypedResults.NotFound();
		}

		bill.Date = req.Date;
		bill.Comment = req.Comment;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
