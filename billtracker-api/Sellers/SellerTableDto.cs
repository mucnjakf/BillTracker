namespace billtracker_api.Sellers;

internal sealed record SellerTableDto(
	int Id,
	string Name,
	string Surname,
	string PermanentEmployee,
	int BillsCount,
	string CreatedUtc);
