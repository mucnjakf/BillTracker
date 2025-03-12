namespace billtracker_api.Customers.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

internal sealed record GetCityCustomersListRequest
{
	[RouteParam]
	public int CityId { get; init; }
}

internal sealed class GetCityCustomersListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCityCustomersListRequest, Ok<IEnumerable<CustomerListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/cities/{cityId}/customers/list");
		Description(x => x.WithTags("Customers"));
	}

	public override async Task<Ok<IEnumerable<CustomerListDto>>> ExecuteAsync(GetCityCustomersListRequest req, CancellationToken ct)
	{
		var query = await appDbContext.Customers
			.AsNoTracking()
			.Where(x => x.CityId == req.CityId)
			.ToListAsync(ct);

		var billsList = query.Select(x => x.ToCustomerListDto());

		return TypedResults.Ok(billsList);
	}
}
