using billtracker_api.Endpoints;

namespace billtracker_api.Dtos;

internal sealed record ItemDto(
	int Id,
	Guid Guid,
	int Quantity,
	decimal TotalPrice,
	BillDto Bill,
	ProductDto Product);