namespace billtracker_api.Entities;

internal sealed class City
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public IEnumerable<Customer>? Customers { get; set; }
}
