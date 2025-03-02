using billtracker_api.Bills;

namespace billtracker_api.Sellers;

internal sealed class Seller
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; init; } = null!;

	public string Surname { get; init; } = null!;

	public bool PermanentEmployee { get; init; }

	public IEnumerable<Bill>? Bills { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
