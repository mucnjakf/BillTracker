namespace billtracker_api.Sellers;

internal sealed record SellerTableDto(
	int Id,
	string Name,
	string Surname,
	bool PermanentEmployee,
	int BillsCount,
	string CreatedUtc);
