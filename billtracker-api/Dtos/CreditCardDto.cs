namespace billtracker_api.Dtos;

internal sealed record CreditCardDto(
	int Id,
	Guid Guid,
	string Type,
	string CardNumber,
	int ExpirationMonth,
	int ExpirationYear);
