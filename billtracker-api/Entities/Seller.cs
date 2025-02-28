namespace billtracker_api.Entities;

internal sealed class Seller
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public bool PermanentEmployee { get; set; }

	public IEnumerable<Bill>? Bills { get; set; }
}
