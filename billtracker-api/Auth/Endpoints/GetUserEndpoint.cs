using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Auth.Endpoints;

internal sealed record GetUserRequest
{
	[RouteParam]
	public int UserId { get; set; }
}

internal sealed class GetUserEndpoint(AppDbContext appDbContext)
	: Endpoint<GetUserRequest, Results<Ok<UserDto>, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Get($"{AppRoutes.Auth}/users/{{userId}}");
		Description(x => x.WithTags(AppRouteTags.Auth));
	}

	public override async Task<Results<Ok<UserDto>, NotFound>> ExecuteAsync(GetUserRequest req, CancellationToken ct)
	{
		var user = await appDbContext.Users.FindAsync([req.UserId], ct);

		if (user is null)
		{
			return TypedResults.NotFound();
		}

		var userDto = user.ToUserDto();

		return TypedResults.Ok(userDto);
	}
}
