using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Customers.Endpoints;

internal sealed class GetTotalCustomersCountEndpoint(AppDbContext appDbContext)
	: EndpointWithoutRequest<Ok<TotalCustomersCountDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Customers}/total-count");
		Description(x => x.WithTags(AppRouteTags.Customers));
	}

	public override async Task<Ok<TotalCustomersCountDto>> ExecuteAsync(CancellationToken ct)
	{
		var totalCustomers = await appDbContext.Customers
			.CountAsync(ct);

		return TypedResults.Ok(new TotalCustomersCountDto(totalCustomers));
	}
}