namespace billtracker_api.Products;

internal sealed record ProductTableDto(
	int Id,
	string Name,
	string ProductNumber,
	decimal Total,
	string CreatedUtc,
	int CategoryId,
	int SubCategoryId);
