namespace billtracker_api.Auth;

internal sealed class PasswordHasher : IPasswordHasher
{

	public string Hash(string password)
	{
		return password;
	}
}

internal interface IPasswordHasher
{
	string Hash(string password);
}
