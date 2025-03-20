using billtracker_api.Database;
using FastEndpoints;
using FastEndpoints.Security;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;

namespace billtracker_api.Auth.Endpoints;

internal sealed record LoginUserRequest(string Email, string Password);

internal sealed class LoginUserEndpoint(
	AppDbContext appDbContext,
	IPasswordHasher passwordHasher,
	IConfiguration configuration)
	: Endpoint<LoginUserRequest, Results<Ok<AuthDto>, UnauthorizedHttpResult>>
{
	public override void Configure()
	{
		AllowAnonymous();
		Post($"{AppRoutes.Auth}/login");
		Description(x => x.WithTags(AppRouteTags.Auth));
	}

	public override async Task<Results<Ok<AuthDto>, UnauthorizedHttpResult>> ExecuteAsync(
		LoginUserRequest req,
		CancellationToken ct)
	{
		var user = await appDbContext.Users
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Email == req.Email, ct);

		if (user is null)
		{
			return TypedResults.Unauthorized();
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
			options.User.Roles.Add(AppRoles.User);
			options.User.Claims.Add((JwtRegisteredClaimNames.Sub, user.Id.ToString()));
			options.User.Claims.Add((JwtRegisteredClaimNames.Email, user.Email));
			options.User.Claims.Add((JwtRegisteredClaimNames.Name, $"{user.Name} {user.Surname}"));
			options.Issuer = configuration["Jwt:Issuer"];
			options.Audience = configuration["Jwt:Audience"];
		});

		var authDto = new AuthDto(jwt);

		return TypedResults.Ok(authDto);
	}
}
