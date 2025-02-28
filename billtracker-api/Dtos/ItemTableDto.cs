namespace billtracker_api.Dtos;

internal sealed record ItemTableDto(
	int Id,
	string ProductName,
	decimal ProductPrice,
	int Quantity,
	decimal TotalPrice);
