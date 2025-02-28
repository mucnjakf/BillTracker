namespace billtracker_api.Dtos;

internal sealed record BillTableDto(
	int Id,
	DateTimeOffset Date,
	string BillNumber,
	decimal Total);