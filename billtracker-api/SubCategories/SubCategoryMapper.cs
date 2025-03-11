using billtracker_api.SubCategories.Endpoints;

namespace billtracker_api.SubCategories;

internal static class SubCategoryMapper
{
	internal static SubCategoryListDto ToSubCategoryListDto(this SubCategory subCategory)
	{
		return new(
			subCategory.Id,
			subCategory.Name);
	}
}
