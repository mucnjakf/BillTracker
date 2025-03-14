using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed record GetCustomerListRequest
{
	[QueryParam]
	public int? CityId { get; init; }

	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;
}

internal sealed class GetCustomerListEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCustomerListRequest, Ok<PagedList<CustomerListDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/list");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<PagedList<CustomerListDto>>> ExecuteAsync(GetCustomerListRequest req, CancellationToken ct)
	{
		var query = appDbContext.Customers
			.AsNoTracking();

		if (req.CityId is not null)
		{
			query = query.Where(x => x.CityId == req.CityId);
		}

		var customers = query.Select(x => x.ToCustomerListDto());

		var customersList = await PagedList<CustomerListDto>.ToPagedListAsync(customers, req.PageNumber, req.PageSize);

		return TypedResults.Ok(customersList);
	}
}
