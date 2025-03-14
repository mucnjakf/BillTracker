using billtracker_api.Bills;
using billtracker_api.Products;

namespace billtracker_api.Items;

internal sealed record ItemDto(
	int Id,
	Guid Guid,
	int Quantity,
	decimal TotalPrice,
	int BillId,
	string BillDate,
	string BillNumber,
	int ProductId,
	string ProductName,
	string ProductNumber,
	string ProductSubCategory,
	string ProductCategory,
	decimal ProductPrice,
	string CustomerName,
	string SellerName,
	string CreatedUtc);