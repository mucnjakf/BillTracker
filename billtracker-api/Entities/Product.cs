namespace billtracker_api.Entities;

internal sealed class Product
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string ProductNumber { get; set; } = null!;

	public string Color { get; set; } = null!;

	public decimal Price { get; set; }
	
	public int SubCategoryId { get; set; }

	public SubCategory SubCategory { get; set; } = null!;

	public IEnumerable<Item>? Items { get; set; }
}
