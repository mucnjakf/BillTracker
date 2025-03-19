namespace billtracker_api.Items;

internal sealed record ItemTableDto(
	int Id,
	string ProductName,
	decimal Total,
	string BillNumber,
	string CustomerName,
	string CreatedUtc,
	int CustomerId,
	int BillId);
