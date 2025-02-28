namespace billtracker_api.Auth;

internal interface IPasswordHasher
{
	string Hash(string password);

	bool Verify(string password, string passwordHash);
}
