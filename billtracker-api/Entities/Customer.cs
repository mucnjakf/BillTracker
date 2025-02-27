namespace billtracker_api.Entities;

internal sealed class Customer
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string Telephone { get; set; } = null!;

	public int? CityId { get; set; }

	public City? City { get; set; }

	public IEnumerable<Bill>? Bills { get; set; }
}