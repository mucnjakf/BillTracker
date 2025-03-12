namespace billtracker_api.Bills;

internal sealed record BillTableDto(
	int Id,
	string Date,
	string BillNumber,
	string CustomerName,
	string SellerName,
	int ItemsCount);
