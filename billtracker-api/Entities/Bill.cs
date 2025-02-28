namespace billtracker_api.Entities;

internal class Bill
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public DateTimeOffset Date { get; set; }

	public string BillNumber { get; set; } = null!;

	public string Comment { get; set; } = null!;

	public int CustomerId { get; set; }

	public Customer Customer { get; set; } = null!;

	public int? SellerId { get; set; }

	public Seller? Seller { get; set; }

	public int? CreditCardId { get; set; }

	public CreditCard? CreditCard { get; set; }

	public IEnumerable<Item>? Items { get; set; }
}
