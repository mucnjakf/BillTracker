using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed record DeleteCityRequest
{
	[RouteParam]
	public int CityId { get; init; }
}

internal sealed class DeleteCityEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteCityRequest, Results<NoContent, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Cities}/{{cityId}}");
		Description(x => x.WithTags(AppRouteTags.Cities));
	}

	public override async Task<Results<NoContent, NotFound, BadRequest>> ExecuteAsync(
		DeleteCityRequest req,
		CancellationToken ct)
	{
		var city = await appDbContext.Cities
			.Include(x => x.Customers)
			.SingleOrDefaultAsync(x => x.Id == req.CityId, ct);

		if (city is null)
		{
			return TypedResults.NotFound();
		}

		if (city.Customers is not null && city.Customers.Any())
		{
			return TypedResults.BadRequest();
		}

		appDbContext.Cities.Remove(city);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
