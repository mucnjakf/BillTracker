using billtracker_api.Items;
using billtracker_api.SubCategories;

namespace billtracker_api.Products;

internal sealed class Product
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; init; } = null!;

	public string ProductNumber { get; init; } = null!;

	public string Color { get; init; } = null!;

	public decimal Price { get; init; }
	
	public int SubCategoryId { get; init; }

	public SubCategory SubCategory { get; init; } = null!;

	public IEnumerable<Item>? Items { get; init; }
}
