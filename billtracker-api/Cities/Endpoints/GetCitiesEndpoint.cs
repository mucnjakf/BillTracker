using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed class GetCitiesEndpoint(AppDbContext appDbContext) : EndpointWithoutRequest<Ok<IEnumerable<CityListDto>>>
{
	public override void Configure()
	{
		Roles("User");
		Get("/api/cities");
		Description(x => x.WithTags("Cities"));
	}

	public override async Task<Ok<IEnumerable<CityListDto>>> ExecuteAsync(CancellationToken ct)
	{
		var cities = await appDbContext.Cities
			.AsNoTracking()
			.ToListAsync(ct);

		var citiesDto = cities.Select(x => x.ToCityListDto());

		return TypedResults.Ok(citiesDto);
	}
}
