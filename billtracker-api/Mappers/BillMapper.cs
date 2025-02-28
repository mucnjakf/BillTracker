using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class BillMapper
{
	internal static BillTableDto ToBillTableDto(this Bill bill)
	{
		return new(bill.Id, bill.Date, bill.BillNumber, bill.Items?.Sum(x => x.TotalPrice) ?? 0);
	}

	internal static BillDto ToBillDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Guid,
			bill.Date,
			bill.BillNumber,
			bill.Comment,
			bill.Items?.Sum(x => x.TotalPrice) ?? 0,
			bill.Customer.ToCustomerDto(),
			bill.Seller?.ToSellerDto(),
			bill.CreditCard?.ToCreditCardDto());
	}
}
