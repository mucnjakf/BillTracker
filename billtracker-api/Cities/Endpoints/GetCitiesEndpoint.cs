using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed class GetCitiesEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<CityDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/cities");
		Description(x => x.WithTags("Cities"));
	}

	public override async Task<Ok<IEnumerable<CityDto>>> ExecuteAsync(CancellationToken ct)
	{
		var cities = await appDbContext.Cities.ToListAsync(ct);

		var citiesDto = cities.Select(x => x.ToCityDto());

		return TypedResults.Ok(citiesDto);
	}
}
