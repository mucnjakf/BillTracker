using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

internal sealed record CreateCityRequest(string Name);

internal sealed class CreateCityEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateCityRequest, Results<Created<CityDto>, BadRequest>>
{
	public override void Configure()
	{
		Roles("User");
		Post("/api/cities");
		Description(x => x.WithTags("Cities"));
	}

	public override async Task<Results<Created<CityDto>, BadRequest>> ExecuteAsync(CreateCityRequest req, CancellationToken ct)
	{
		var cityExists = await appDbContext.Cities.AnyAsync(x => x.Name.ToUpper() == req.Name.ToUpper(), ct);

		if (cityExists)
		{
			return TypedResults.BadRequest();
		}

		var city = new City
		{
			Name = req.Name
		};

		await appDbContext.Cities.AddAsync(city, ct);
		await appDbContext.SaveChangesAsync(ct);

		var cityDto = city.ToCityDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/cities/{cityDto.Id}", cityDto);
	}
}
