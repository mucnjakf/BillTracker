namespace billtracker_api.Customers;

internal sealed record CustomerTableDto(
	int Id,
	string Name,
	string Surname,
	string Email,
	string Telephone,
	string CityName,
	DateTimeOffset CreatedUtc);
