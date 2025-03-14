using billtracker_api.CreditCards;
using billtracker_api.Customers;
using billtracker_api.Sellers;

namespace billtracker_api.Bills;

internal static class BillMapper
{
	internal static BillDto ToBillDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Guid,
			bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			bill.BillNumber,
			bill.Comment,
			bill.Items?.Sum(x => x.TotalPrice) ?? 0,
			bill.Customer.ToCustomerDto(),
			bill.Seller?.ToSellerDto(),
			bill.CreditCard?.ToCreditCardDto());
	}

	internal static BillListDto ToBillListDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			bill.BillNumber,
			bill.Items?.Sum(x => x.TotalPrice) ?? 0,
			bill.CustomerId);
	}

	internal static BillTableDto ToBillTableDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			bill.BillNumber,
			bill.Items?.Count() ?? 0,
			bill.Items?.Sum(x => x.TotalPrice) ?? 0);
	}
}
