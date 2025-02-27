namespace billtracker_api.Entities;

internal class SubCategory
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public int CategoryId { get; set; }

	public Category Category { get; set; } = null!;

	public IEnumerable<Product>? Products { get; set; }
}
