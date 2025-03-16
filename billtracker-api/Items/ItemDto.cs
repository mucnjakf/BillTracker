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
	string BillComment,
	string CustomerName,
	string SellerName,
	int ProductId,
	string ProductName,
	string ProductNumber,
	string ProductColor,
	decimal ProductPrice,
	string ProductSubCategory,
	string ProductCategory,
	string CreatedUtc);
