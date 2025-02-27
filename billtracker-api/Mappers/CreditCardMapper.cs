using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class CreditCardMapper
{
	internal static BillCreditCardDto ToBillCreditCardDto(this CreditCard creditCard)
	{
		return new BillCreditCardDto(
			creditCard.Id,
			creditCard.Guid,
			creditCard.Type,
			creditCard.CardNumber,
			creditCard.ExpirationMonth,
			creditCard.ExpirationYear);
	}
}
