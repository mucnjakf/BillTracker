namespace billtracker_api.Bills;

internal sealed record BillTableDto(
	int Id,
	string Date,
	string BillNumber,
	int ItemCount,
	decimal Total,
	int CustomerId);
