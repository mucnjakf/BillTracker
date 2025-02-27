namespace billtracker_api.Dtos;

internal sealed record CustomerBillTableDto(
	int Id,
	DateTimeOffset Date,
	string BillNumber,
	decimal Total);