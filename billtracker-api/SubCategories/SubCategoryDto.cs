namespace billtracker_api.SubCategories;

internal sealed record SubCategoryDto(
	int Id,
	Guid Guid,
	string Name,
	int CategoryId,
	string CategoryName,
	string CreatedUtc);
