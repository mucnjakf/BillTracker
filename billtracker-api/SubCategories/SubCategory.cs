using billtracker_api.Categories;
using billtracker_api.Products;

namespace billtracker_api.SubCategories;

internal sealed class SubCategory
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; init; } = null!;

	public int CategoryId { get; init; }

	public Category Category { get; init; } = null!;

	public IEnumerable<Product>? Products { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
