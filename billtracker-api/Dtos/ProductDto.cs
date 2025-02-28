namespace billtracker_api.Dtos;

internal sealed record ProductDto(
	int Id,
	Guid Guid,
	string Name,
	string ProductNumber,
	string Color,
	decimal Price,
	string SubCategoryName,
	string CategoryName);