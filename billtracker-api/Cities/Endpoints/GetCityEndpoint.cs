using billtracker_api.Auth;

namespace billtracker_api.Cities.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

internal sealed record GetCityRequest
{
	[RouteParam]
	public int CityId { get; init; }
}

internal sealed class GetCityEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCityRequest, Results<Ok<CityDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Cities}/{{cityId}}");
		Description(x => x.WithTags(AppRouteTags.Cities));
	}

	public override async Task<Results<Ok<CityDto>, NotFound>> ExecuteAsync(
		GetCityRequest req,
		CancellationToken ct)
	{
		var city = await appDbContext.Cities
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Id == req.CityId, ct);

		if (city is null)
		{
			return TypedResults.NotFound();
		}

		var cityDto = city.ToCityDto();

		return TypedResults.Ok(cityDto);
	}
}
