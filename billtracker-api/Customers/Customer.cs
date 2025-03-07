using billtracker_api.Bills;
using billtracker_api.Cities;

namespace billtracker_api.Customers;

internal sealed class Customer
{
	public int Id { get; init; }

	public Guid Guid { get; init; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string Telephone { get; set; } = null!;

	public int? CityId { get; set; }

	public City? City { get; init; }

	public IEnumerable<Bill>? Bills { get; init; }

	public DateTimeOffset CreatedUtc { get; init; } = DateTimeOffset.UtcNow;
}