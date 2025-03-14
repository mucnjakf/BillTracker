using billtracker_api.Auth;
using billtracker_api.Pagination;

namespace billtracker_api.Customers.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

internal sealed record GetCityCustomersListRequest
{
	[RouteParam]
	public int CityId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetCityCustomersListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCityCustomersListRequest, Ok<PagedList<CustomerListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Cities}/{{cityId}}/customers/list");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<PagedList<CustomerListDto>>> ExecuteAsync(GetCityCustomersListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Customers
			.AsNoTracking()
			.Where(x => x.CityId == req.CityId);

		var bills = query.Select(x => x.ToCustomerListDto());

		var billsList = await PagedList<CustomerListDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsList);
	}
}
