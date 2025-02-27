using billtracker_api.Database;
using billtracker_api.Dtos;
using billtracker_api.Mappers;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints.Bills;

internal sealed record GetCustomerBillRequest
{
	[RouteParam]
	public int CustomerId { get; set; }

	[RouteParam]
	public int BillId { get; set; }
}

internal sealed class GetCustomerBillEndpoint(AppDbContext appDbContext) : Endpoint<GetCustomerBillRequest, Results<Ok<BillDto>, NotFound>>
{
	public override void Configure()
	{
		Get("/api/customers/{customerId}/bills/{billId}");
		AllowAnonymous();
	}

	public override async Task<Results<Ok<BillDto>, NotFound>> ExecuteAsync(GetCustomerBillRequest req, CancellationToken ct)
	{
		var bill = await appDbContext.Bills
			.AsNoTracking()
			.Include(x => x.Customer)
			.ThenInclude(x => x.City)
			.Include(x => x.Seller)
			.Include(x => x.CreditCard)
			.SingleOrDefaultAsync(x => x.CustomerId == req.CustomerId && x.Id == req.BillId, ct);

		if (bill is null)
		{
			return TypedResults.NotFound();
		}

		var billDto = bill.ToBillDto();

		return TypedResults.Ok(billDto);
	}
}
