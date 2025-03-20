using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;

namespace billtracker_api.Auth.Endpoints;

internal sealed record DeleteUserProfileImageRequest
{
	[RouteParam]
	public int UserId { get; init; }
}

internal sealed class DeleteUserProfileImageEndpoint(AppDbContext appDbContext)
	: Endpoint<DeleteUserProfileImageRequest, Results<NoContent, NotFound>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Delete($"{AppRoutes.Auth}/users/{{userId}}/profile-image");
		Description(x => x.WithTags(AppRouteTags.Auth));
	}

	public override async Task<Results<NoContent, NotFound>> ExecuteAsync(DeleteUserProfileImageRequest req, CancellationToken ct)
	{
		var user = await appDbContext.Users
			.FindAsync([req.UserId], ct);

		if (user is null)
		{
			return TypedResults.NotFound();
		}

		user.ProfileImage = null;
		await appDbContext.SaveChangesAsync(ct);

		return TypedResults.NoContent();
	}
}
