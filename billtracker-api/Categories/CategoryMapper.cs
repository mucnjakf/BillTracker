namespace billtracker_api.Categories;

internal static class CategoryMapper
{
	internal static CategoryListDto ToCategoryListDto(this Category category)
	{
		return new(
			category.Id,
			category.Name
		);
	}
}
