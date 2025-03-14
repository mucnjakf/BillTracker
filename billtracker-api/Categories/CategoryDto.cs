namespace billtracker_api.Categories;

internal sealed record CategoryDto(
	int Id,
	Guid Guid,
	string Name,
	string CreatedUtc);
