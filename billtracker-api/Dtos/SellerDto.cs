namespace billtracker_api.Dtos;

internal sealed record SellerDto(
	int Id,
	Guid Guid,
	string Name,
	string Surname,
	bool PermanentEmployee);
