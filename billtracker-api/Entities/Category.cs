namespace billtracker_api.Entities;

internal class Category
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public IEnumerable<SubCategory>? SubCategories { get; set; }
}
