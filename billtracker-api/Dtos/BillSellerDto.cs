namespace billtracker_api.Dtos;

internal sealed record BillSellerDto(
	int Id,
	Guid Guid,
	string Name,
	string Surname,
	bool PermanentEmployee);
