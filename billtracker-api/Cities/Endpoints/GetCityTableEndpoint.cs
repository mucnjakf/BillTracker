using billtracker_api.Database;
using billtracker_api.Pagination;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Cities.Endpoints;

internal sealed record GetCityTableRequest
{
	[QueryParam]
	public int PageNumber { get; init; } = 1;

	[QueryParam]
	public int PageSize { get; init; } = 10;

	[QueryParam]
	public string? SearchQuery { get; init; } = null;

	[QueryParam]
	public string? SortBy { get; init; } = null;
}

internal sealed class GetCityTableEndpoint(AppDbContext appDbContext)
	: Endpoint<GetCityTableRequest, Ok<PagedList<CityTableDto>>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Get("/api/cities/table");
		Description(x => x.WithTags("Cities"));
	}

	public override async Task<Ok<PagedList<CityTableDto>>> ExecuteAsync(
		GetCityTableRequest req,
		CancellationToken ct)
	{
		IQueryable<City> query = appDbContext.Cities
			.AsNoTracking()
			.Include(x => x.Customers);

		query = Search(req.SearchQuery, query);
		query = Sort(req.SortBy, query);

		var cities = query.Select(x => x.ToCityTableDto());

		var citiesTable = await PagedList<CityTableDto>
			.ToPagedListAsync(cities, req.PageNumber, req.PageSize);

		return TypedResults.Ok(citiesTable);
	}

	private static IQueryable<City> Search(string? searchQuery, IQueryable<City> query)
	{
		if (string.IsNullOrWhiteSpace(searchQuery))
		{
			return query;
		}

		var capitalSearchQuery = searchQuery.ToUpper();

		query = query.Where(x =>
			x.Name.ToUpper().Contains(capitalSearchQuery));

		return query;
	}

	private static IQueryable<City> Sort(string? sortBy, IQueryable<City> query)
	{
		return sortBy switch
		{
			"created-asc" => query.OrderBy(x => x.CreatedUtc),
			"created-desc" => query.OrderByDescending(x => x.CreatedUtc),
			"name-asc" => query.OrderBy(x => x.Name),
			"name-desc" => query.OrderByDescending(x => x.Name),
			"customersCount-asc" => query.OrderBy(x => x.Customers!.Count()),
			"customersCount-desc" => query.OrderByDescending(x => x.Customers!.Count()),
			_ => query.OrderByDescending(x => x.CreatedUtc)
		};
	}
}
