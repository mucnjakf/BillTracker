namespace billtracker_api.Sellers;

internal sealed record SellerDto(
	int Id,
	Guid Guid,
	string Name,
	string FirstName,
	string LastName,
	bool PermanentEmployee, 
	string CreatedUtc);
