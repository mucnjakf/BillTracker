namespace billtracker_api.Bills;

internal sealed record BillDto(
	int Id,
	Guid Guid,
	string Date,
	string BillNumber,
	string Comment,
	decimal Total,
	int CustomerId,
	string CustomerName,
	int? SellerId,
	string? SellerName);