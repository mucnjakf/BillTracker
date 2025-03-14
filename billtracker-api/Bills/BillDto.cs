using billtracker_api.CreditCards;
using billtracker_api.Customers;
using billtracker_api.Sellers;

namespace billtracker_api.Bills;

internal sealed record BillDto(
	int Id,
	Guid Guid,
	string Date,
	string BillNumber,
	string Comment,
	decimal Total,
	// TODO: u simple types
	CustomerDto Customer,
	SellerDto? Seller,
	CreditCardDto? CreditCard);