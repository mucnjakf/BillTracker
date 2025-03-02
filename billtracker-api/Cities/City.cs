using billtracker_api.Customers;

namespace billtracker_api.Cities;

internal sealed class City
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; init; } = null!;

	public IEnumerable<Customer>? Customers { get; init; }
	
	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}
