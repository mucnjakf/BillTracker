namespace billtracker_api.Cities;

internal sealed record CityDto(
	int Id, 
	Guid Guid,
	string Name,
	string CreatedUtc);