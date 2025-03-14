namespace billtracker_api.Products;

internal sealed record ProductDto(
	int Id,
	Guid Guid,
	string Name,
	string ProductNumber,
	string Color,
	decimal Price,
	int SubCategoryId,
	string SubCategoryName,
	int CategoryId,
	string CategoryName,
	string CreatedUtc);
