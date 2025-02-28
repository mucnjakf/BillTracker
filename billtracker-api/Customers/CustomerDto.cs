namespace billtracker_api.Customers;

internal sealed record CustomerDto(
	int Id,
	Guid Guid,
	string Name,
	string Surname,
	string Email,
	string Telephone,
	string CityName);
