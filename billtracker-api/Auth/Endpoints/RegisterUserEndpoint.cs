using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Auth.Endpoints;

internal sealed record RegisterUserRequest(
	string Name,
	string Surname,
	string Email,
	string Password,
	string? ProfileImage);

internal sealed class RegisterUserEndpoint(AppDbContext appDbContext, IPasswordHasher passwordHasher)
	: Endpoint<RegisterUserRequest, Results<NoContent, BadRequest>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Post($"{AppRoutes.Auth}/register");
		Description(x => x.WithTags(AppRouteTags.Auth));
	}

	public override async Task<Results<NoContent, BadRequest>> ExecuteAsync(
		RegisterUserRequest req,
		CancellationToken ct)
	{
		var emailInUse = await appDbContext.Users
			.AsNoTracking()
			.AnyAsync(x => x.Email == req.Email, ct);

		if (emailInUse)
		{
			return TypedResults.BadRequest();
		}

		var user = new User
		{
			Name = req.Name,
			Surname = req.Surname,
			Email = req.Email,
			Password = passwordHasher.Hash(req.Password),
			ProfileImage = req.ProfileImage is not null ? Convert.FromBase64String(req.ProfileImage) : null
		};

		await appDbContext.Users.AddAsync(user, ct);
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
