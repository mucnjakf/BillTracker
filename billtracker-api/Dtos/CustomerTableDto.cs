namespace billtracker_api.Dtos;

internal sealed record CustomerTableDto(int Id, string Name, string Surname, string Email, string Telephone, string CityName);
