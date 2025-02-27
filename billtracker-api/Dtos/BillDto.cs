namespace billtracker_api.Dtos;

internal sealed record BillDto(
	int Id,
	Guid Guid,
	DateTimeOffset Date,
	string BillNumber,
	string Comment,
	decimal Total,
	BillCustomerDto Customer,
	BillSellerDto? Seller,
	BillCreditCardDto? CreditCard);