namespace billtracker_api.Items;

internal sealed record ItemTableDto(
	int Id,
	string ProductName,
	decimal TotalPrice,
	string BillNumber,
	string CustomerName,
	string CreatedUtc,
	int CustomerId,
	int BillId);
