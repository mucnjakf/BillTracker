namespace billtracker_api.Items;

internal sealed record ItemListDto(
	int Id,
	string ProductName,
	decimal ProductPrice,
	int Quantity,
	decimal TotalPrice);