namespace billtracker_api.Auth;

internal static class UserMapper
{
	internal static UserDto ToUserDto(this User user)
	{
		return new(
			user.Id,
			user.Guid,
			user.Name,
			user.Surname,
			user.Email,
			user.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"),
			user.ProfileImage is not null ? Convert.ToBase64String(user.ProfileImage.ToArray()) : null);
	}
}
