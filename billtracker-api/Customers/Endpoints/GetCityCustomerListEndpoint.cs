using billtracker_api.Auth;
using billtracker_api.Pagination;

namespace billtracker_api.Customers.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

internal sealed record GetCityCustomerListRequest
{
	[QueryParam]
	public int CityId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetCityCustomerListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCityCustomerListRequest, Ok<PagedList<CustomerListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/list");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<PagedList<CustomerListDto>>> ExecuteAsync(GetCityCustomerListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Customers
			.AsNoTracking()
			.Where(x => x.CityId == req.CityId);

		var bills = query.Select(x => x.ToCustomerListDto());

		var billsList = await PagedList<CustomerListDto>.ToPagedListAsync(bills, req.PageNumber, req.PageSize);

		return TypedResults.Ok(billsList);
	}
}
