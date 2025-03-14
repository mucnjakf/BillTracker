namespace billtracker_api.Customers;

internal sealed record CustomerTableDto(
	int Id,
	string Name,
	string Surname,
	string Telephone,
	string CityName,
	int BillsCount,
	string CreatedUtc);
