using billtracker_api.SubCategories;

namespace billtracker_api.Categories;

internal sealed class Category
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public IEnumerable<SubCategory>? SubCategories { get; set; }
}
