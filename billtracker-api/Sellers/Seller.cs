using billtracker_api.Bills;

namespace billtracker_api.Sellers;

internal sealed class Seller
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public bool PermanentEmployee { get; set; }

	public IEnumerable<Bill>? Bills { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
