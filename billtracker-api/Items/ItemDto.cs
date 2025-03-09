using billtracker_api.Bills;
using billtracker_api.Products;

namespace billtracker_api.Items;

internal sealed record ItemDto(
	int Id,
	Guid Guid,
	int Quantity,
	decimal TotalPrice,
	BillDto Bill,
	ProductDto Product,
	string CreatedUtc);