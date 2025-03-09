namespace billtracker_api.CreditCards;

internal sealed record CreditCardDto(
	int Id,
	Guid Guid,
	string Type,
	string CardNumber,
	int ExpirationMonth,
	int ExpirationYear,
	string CreatedUtc);
