namespace billtracker_api.Categories;

internal sealed record CategoryTableDto(int Id, string Name, int SubCategoriesCount, string CreatedUtc);