namespace billtracker_api.Dtos;

internal sealed record BillCreditCardDto(
	int Id,
	Guid Guid,
	string Type,
	string CardNumber,
	int ExpirationMonth,
	int ExpirationYear);
