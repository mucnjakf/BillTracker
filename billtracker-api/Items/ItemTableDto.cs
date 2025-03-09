namespace billtracker_api.Items;

internal sealed record ItemTableDto(
	int Id,
	string ProductName,
	decimal ProductPrice,
	int Quantity,
	decimal TotalPrice,
	string CreatedUtc);
