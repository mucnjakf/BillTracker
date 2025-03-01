using billtracker_api.Bills;
using billtracker_api.Products;

namespace billtracker_api.Items;

internal sealed class Item
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public int Quantity { get; set; }

	public decimal TotalPrice { get; set; }

	public int BillId { get; init; }

	public Bill Bill { get; init; } = null!;

	public int ProductId { get; init; }
 
	public Product Product { get; init; } = null!;
}
