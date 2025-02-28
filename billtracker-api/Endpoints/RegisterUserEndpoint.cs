using billtracker_api.Auth;
using billtracker_api.Database;
using billtracker_api.Entities;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record RegisterUserRequest(string Name, string Surname, string Email, string Password);

internal sealed class RegisterUserEndpoint(AppDbContext appDbContext, IPasswordHasher passwordHasher) : Endpoint<RegisterUserRequest, Results<NoContent, BadRequest>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Post("/api/auth/register");
		Description(x => x.WithTags("Auth"));
	}

	public override async Task<Results<NoContent, BadRequest>> ExecuteAsync(RegisterUserRequest req, CancellationToken ct)
	{
		var userExists = await appDbContext.Users.AnyAsync(x => x.Email == req.Email, ct);

		if (userExists)
		{
			return TypedResults.BadRequest();
		}

		var user = new User
		{
			Name = req.Name,
			Surname = req.Surname,
			Email = req.Email,
			Password = passwordHasher.Hash(req.Password)
		};

		await appDbContext.Users.AddAsync(user, ct);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
