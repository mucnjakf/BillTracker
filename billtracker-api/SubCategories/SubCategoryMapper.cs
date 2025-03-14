namespace billtracker_api.SubCategories;

internal static class SubCategoryMapper
{
	internal static SubCategoryDto ToSubCategoryDto(this SubCategory subCategory)
	{
		return new(
			subCategory.Id,
			subCategory.Guid,
			subCategory.Name,
			subCategory.Category.Id,
			subCategory.Category.Name,
			subCategory.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}

	internal static SubCategoryListDto ToSubCategoryListDto(this SubCategory subCategory)
	{
		return new(
			subCategory.Id,
			subCategory.Name);
	}
}
