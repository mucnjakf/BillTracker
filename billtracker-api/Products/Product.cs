using billtracker_api.Items;
using billtracker_api.SubCategories;

namespace billtracker_api.Products;

internal sealed class Product
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string ProductNumber { get; set; } = null!;

	public string Color { get; set; } = null!;

	public decimal Price { get; set; }

	public int SubCategoryId { get; init; }

	public SubCategory SubCategory { get; init; } = null!;

	public IEnumerable<Item>? Items { get; init; }

	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
