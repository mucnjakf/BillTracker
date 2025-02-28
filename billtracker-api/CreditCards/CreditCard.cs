using billtracker_api.Bills;

namespace billtracker_api.CreditCards;

internal sealed class CreditCard
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Type { get; set; } = null!;

	public string CardNumber { get; set; } = null!;

	public int ExpirationMonth { get; set; }

	public int ExpirationYear { get; set; }

	public IEnumerable<Bill>? Bills { get; set; }
}