namespace billtracker_api.SubCategories;

internal sealed record SubCategoryTableDto(
	int Id,
	string Name,
	string CategoryName,
	int ProductsCount,
	string CreatedUtc);