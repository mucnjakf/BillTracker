namespace billtracker_api.Products;

internal sealed record ProductListDto(
	int Id,
	string Name,
	string ProductNumber,
	string Color,
	decimal Price);
