using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Bills.Endpoints;

internal sealed class GetTotalBillsCountEndpoint(AppDbContext appDbContext)
: EndpointWithoutRequest<Ok<TotalBillsCountDto>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Bills}/total-count");
		Description(x => x.WithTags(AppRouteTags.Bills));
	}

	public override async Task<Ok<TotalBillsCountDto>> ExecuteAsync(CancellationToken ct)
	{
		var totalBills = await appDbContext.Bills
			.CountAsync(ct);

		return TypedResults.Ok(new TotalBillsCountDto(totalBills));
	}
}