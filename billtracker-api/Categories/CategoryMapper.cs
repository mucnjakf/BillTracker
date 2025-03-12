namespace billtracker_api.Categories;

internal static class CategoryMapper
{
	internal static CategoryDto ToCategoryDto(this Category category)
	{
		return new(
			category.Id,
			category.Name
		);
	}
}
