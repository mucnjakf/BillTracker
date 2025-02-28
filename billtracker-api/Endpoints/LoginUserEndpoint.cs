using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using FastEndpoints.Security;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;

namespace billtracker_api.Endpoints;

internal sealed record LoginUserRequest(string Email, string Password);

internal sealed class LoginUserEndpoint(AppDbContext appDbContext, IPasswordHasher passwordHasher, IConfiguration configuration)
	: Endpoint<LoginUserRequest, Results<Ok<AuthDto>, NotFound, UnauthorizedHttpResult>>
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

		var jwt = JwtBearer.CreateToken(options =>
		{
			options.SigningKey = configuration["Jwt:Secret"]!;
			options.ExpireAt = DateTime.UtcNow.AddDays(configuration.GetValue<int>("Jwt:ExpireDays"));
			options.User.Roles.Add("User");
			options.User.Claims.Add((JwtRegisteredClaimNames.Sub, user.Id.ToString()));
			options.User.Claims.Add((JwtRegisteredClaimNames.Email, user.Email));
			options.Issuer = configuration["Jwt:Issuer"];
			options.Audience = configuration["Jwt:Audience"];
		});

		var authDto = new AuthDto(jwt);

		return TypedResults.Ok(authDto);
	}
}
