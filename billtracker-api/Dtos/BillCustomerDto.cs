namespace billtracker_api.Dtos;

internal sealed record BillCustomerDto(
	int Id,
	Guid Guid,
	string Name,
	string Surname,
	string Email,
	string Telephone,
	string CityName);
