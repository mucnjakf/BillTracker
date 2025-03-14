using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Auth.Endpoints;

internal sealed record UpdateUserRequest
{
	[RouteParam]
	public int UserId { get; init; }

	public string Name { get; init; } = null!;

	public string Surname { get; init; } = null!;

	public string Email { get; init; } = null!;

	public string? Password { get; init; }
}

internal sealed class UpdateUserEndpoint(AppDbContext appDbContext, IPasswordHasher passwordHasher)
	: Endpoint<UpdateUserRequest, Results<NoContent, BadRequest, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Put($"{AppRoutes.Auth}/users/{{userId}}");
		Description(x => x.WithTags(AppRouteTags.Auth));
	}

	public override async Task<Results<NoContent, BadRequest, NotFound>> ExecuteAsync(
		UpdateUserRequest req,
		CancellationToken ct)
	{
		var user = await appDbContext.Users.FindAsync([req.UserId], ct);

		if (user is null)
		{
			return TypedResults.NotFound();
		}

		var emailInUse = await appDbContext.Users
			.AsNoTracking()
			.Where(x => x.Id != user.Id)
			.AnyAsync(x => x.Email == req.Email, ct);

		if (emailInUse)
		{
			return TypedResults.BadRequest();
		}

		user.Name = req.Name;
		user.Surname = req.Surname;
		user.Email = req.Email;

		if (!string.IsNullOrEmpty(req.Password))
		{
			var verified = passwordHasher.Verify(req.Password, user.Password);

			if (!verified)
			{
				user.Password = passwordHasher.Hash(req.Password);
			}
		}

		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
