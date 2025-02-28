using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Endpoints;

internal sealed record LoginUserRequest(string Email, string Password);

internal sealed class LoginUserEndpoint(AppDbContext appDbContext, IPasswordHasher passwordHasher) : Endpoint<LoginUserRequest, Results<Ok<AuthDto>, NotFound, UnauthorizedHttpResult>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Post("/api/auth/login");
		Description(x => x.WithTags("Auth"));
	}

	public override async Task<Results<Ok<AuthDto>, NotFound, UnauthorizedHttpResult>> ExecuteAsync(LoginUserRequest req, CancellationToken ct)
	{
		var user = await appDbContext.Users.SingleOrDefaultAsync(x => x.Email == req.Email, ct);

		if (user is null)
		{
			return TypedResults.NotFound();
		}

		var verified = passwordHasher.Verify(req.Password, user.Password);

		if (!verified)
		{
			return TypedResults.Unauthorized();
		}

		var authDto = new AuthDto("accesstoken");

		return TypedResults.Ok(authDto);
	}
}

internal sealed record AuthDto(string AccessToken);
