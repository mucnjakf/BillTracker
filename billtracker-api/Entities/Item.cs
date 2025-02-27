namespace billtracker_api.Entities;

internal sealed class Item
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public int Quantity { get; set; }

	public decimal TotalPrice { get; set; }

	public int BillId { get; set; }

	public Bill Bill { get; set; } = null!;

	public int ProductId { get; set; }
 
	public Product Product { get; set; } = null!;
}
