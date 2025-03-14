using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed record UpdateCityRequest
{
	[FromRoute]
	public int CityId { get; init; }

	public string Name { get; init; } = null!;
}

internal sealed class UpdateCityEndpoint(AppDbContext appDbContext)
	: Endpoint<UpdateCityRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Cities}/{{cityId}}");
		Description(x => x.WithTags(AppRouteTags.Cities));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		UpdateCityRequest req,
		CancellationToken ct)
	{
		var city = await appDbContext.Cities.FindAsync([req.CityId], cancellationToken: ct);

		if (city is null)
		{
			return TypedResults.NotFound();
		}

		var cityExists = await appDbContext.Cities.AnyAsync(x => x.Name.ToUpper() == req.Name.ToUpper(), ct);

		if (cityExists)
		{
			return TypedResults.BadRequest();
		}
		
		city.Name = req.Name;

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
