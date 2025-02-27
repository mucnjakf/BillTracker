using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class BillMapper
{
	internal static CustomerBillTableDto ToCustomerBillTableDto(this Bill bill)
	{
		return new(bill.Id, bill.Date, bill.BillNumber, bill.Total);
	}

	internal static BillDto ToBillDto(this Bill bill)
	{
		return new BillDto(
			bill.Id,
			bill.Guid,
			bill.Date,
			bill.BillNumber,
			bill.Comment,
			bill.Total,
			bill.Customer.ToBillCustomerDto(),
			bill.Seller?.ToBillSellerDto(),
			bill.CreditCard?.ToBillCreditCardDto());
	}
}
