using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class CreditCardMapper
{
	internal static CreditCardDto ToCreditCardDto(this CreditCard creditCard)
	{
		return new CreditCardDto(
			creditCard.Id,
			creditCard.Guid,
			creditCard.Type,
			creditCard.CardNumber,
			creditCard.ExpirationMonth,
			creditCard.ExpirationYear);
	}
}
