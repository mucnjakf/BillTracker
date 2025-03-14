using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed record GetCustomerBillRequest
{
	[RouteParam]
	public int BillId { get; init; }

	[QueryParam]
	public int CustomerId { get; init; }
}

internal sealed class GetCustomerBillEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerBillRequest, Results<Ok<BillDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/{{billId}}");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Results<Ok<BillDto>, NotFound>> ExecuteAsync(GetCustomerBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Customer)
			.ThenInclude(x => x.City)
			.Include(x => x.Seller)
			.Include(x => x.CreditCard)
			.Include(x => x.Items)
			.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		var billDto = bill.ToBillDto();

		return TypedResults.Ok(billDto);
	}
}
