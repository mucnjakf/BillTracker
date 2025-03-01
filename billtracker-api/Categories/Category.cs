using billtracker_api.SubCategories;

namespace billtracker_api.Categories;

internal sealed class Category
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; init; } = null!;

	public IEnumerable<SubCategory>? SubCategories { get; init; }
}
