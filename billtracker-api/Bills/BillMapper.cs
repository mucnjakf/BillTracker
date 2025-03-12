using billtracker_api.CreditCards;
using billtracker_api.Customers;
using billtracker_api.Sellers;

namespace billtracker_api.Bills;

internal static class BillMapper
{
	internal static CustomerBillTableDto ToCustomerBillTableDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			bill.BillNumber,
			bill.Items?.Count() ?? 0,
			bill.Items?.Sum(x => x.TotalPrice) ?? 0);
	}

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
			bill.Items?.Sum(x => x.TotalPrice) ?? 0);
	}

	internal static BillTableDto ToBillTableDto(this Bill bill)
	{
		return new(
			bill.Id,
			bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			bill.BillNumber,
			$"{bill.Customer.Name} {bill.Customer.Surname}",
			bill.Seller is null ? "-" : $"{bill.Seller!.Name} {bill.Seller!.Surname}",
			bill.Items?.Count() ?? 0);
	}
}
