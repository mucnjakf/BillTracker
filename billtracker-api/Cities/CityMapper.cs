namespace billtracker_api.Cities;

internal static class CityMapper
{
	internal static CityListDto ToCityListDto(this City city)
	{
		return new(city.Id, city.Name);
	}
}
