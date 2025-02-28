namespace billtracker_api.Auth;

internal sealed class User
{
	public int Id { get; set; }

	public Guid Guid { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Surname { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string Password { get; set; } = null!;
}
