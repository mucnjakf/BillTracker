using billtracker_api.Bills;

namespace billtracker_api.CreditCards;

internal sealed class CreditCard
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Type { get; init; } = null!;

	public string CardNumber { get; init; } = null!;

	public int ExpirationMonth { get; init; }

	public int ExpirationYear { get; init; }

	public IEnumerable<Bill>? Bills { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}