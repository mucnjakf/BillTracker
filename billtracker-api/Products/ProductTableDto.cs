namespace billtracker_api.Products;

internal sealed record ProductTableDto(
	int Id,
	string Name,
	string ProductNumber,
	decimal Price,
	string CreatedUtc);
