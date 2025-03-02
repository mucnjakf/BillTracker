using billtracker_api.CreditCards;
using billtracker_api.Customers;
using billtracker_api.Items;
using billtracker_api.Sellers;

namespace billtracker_api.Bills;

internal sealed class Bill
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public DateTimeOffset Date { get; set; }

	public string BillNumber { get; init; } = null!;

	public string Comment { get; set; } = null!;

	public int CustomerId { get; init; }

	public Customer Customer { get; init; } = null!;

	public int? SellerId { get; init; }

	public Seller? Seller { get; init; }

	public int? CreditCardId { get; init; }

	public CreditCard? CreditCard { get; init; }

	public IEnumerable<Item>? Items { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
