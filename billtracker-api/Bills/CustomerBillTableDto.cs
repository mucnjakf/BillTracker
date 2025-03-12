namespace billtracker_api.Bills;

internal sealed record CustomerBillTableDto(
	int Id,
	string Date,
	string BillNumber,
	int ItemCount,
	decimal Total);