namespace billtracker_api.Bills;

internal sealed record BillTableDto(
	int Id,
	DateTimeOffset Date,
	string BillNumber,
	decimal Total);