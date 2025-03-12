namespace billtracker_api.Cities;

internal sealed record CityTableDto(
	int Id,
	string Name,
	int CustomersCount,
	string CreatedUtc);