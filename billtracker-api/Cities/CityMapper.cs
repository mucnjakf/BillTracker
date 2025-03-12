namespace billtracker_api.Cities;

internal static class CityMapper
{
	internal static CityDto ToCityDto(this City city)
	{
		return new(city.Id, city.Name);
	}

	internal static CityTableDto ToCityTableDto(this City city)
	{
		return new(
			city.Id,
			city.Name,
			city.Customers?.Count() ?? 0,
			city.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
