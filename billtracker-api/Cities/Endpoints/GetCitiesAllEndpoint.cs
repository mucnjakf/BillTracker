using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed class GetCitiesAllEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<CityDto>>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get(AppRoutes.Cities);
		Description(x => x.WithTags(AppRouteTags.Cities));
	}

	public override async Task<Ok<IEnumerable<CityDto>>> ExecuteAsync(CancellationToken ct)
	{
		var cities = await appDbContext.Cities
			.AsNoTracking()
			.ToListAsync(ct);

		var citiesDto = cities.Select(x => x.ToCityDto());

		return TypedResults.Ok(citiesDto);
	}
}
