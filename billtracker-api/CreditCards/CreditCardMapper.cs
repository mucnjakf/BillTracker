namespace billtracker_api.CreditCards;

internal static class CreditCardMapper
{
	internal static CreditCardDto ToCreditCardDto(this CreditCard creditCard)
	{
		return new(
			creditCard.Id,
			creditCard.Guid,
			creditCard.Type,
			creditCard.CardNumber,
			creditCard.ExpirationMonth,
			creditCard.ExpirationYear,
			creditCard.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
