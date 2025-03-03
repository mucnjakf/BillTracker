namespace billtracker_api.Cities;

internal static class CityMapper
{
	internal static CityDto ToCityDto(this City city)
	{
		return new(city.Id, city.Name);
	}
}
