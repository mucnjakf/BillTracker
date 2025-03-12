namespace billtracker_api.Sellers;

internal sealed record SellerDto(
	int Id,
	Guid Guid,
	string Name,
	bool PermanentEmployee, 
	string CreatedUtc);
