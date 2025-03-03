namespace billtracker_api.Auth;

internal sealed record UserDto(int Id, Guid Guid, string Name, string Surname, string Email, DateTimeOffset CreatedUtc);
