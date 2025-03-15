namespace billtracker_api.Products;

internal sealed record ProductListDto(
	int Id,
	string Name,
	decimal Price);