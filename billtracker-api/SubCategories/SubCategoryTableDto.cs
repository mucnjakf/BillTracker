namespace billtracker_api.SubCategories;

internal sealed record SubCategoryTableDto(
	int Id,
	string Name,
	int ProductsCount,
	string CreatedUtc,
	int CategoryId);