namespace billtracker_api.Sellers;

internal static class SellerMapper
{
	internal static SellerDto ToSellerDto(this Seller seller)
	{
		return new(
			seller.Id,
			seller.Guid,
			$"{seller.Name} {seller.Surname}",
			seller.PermanentEmployee,
			seller.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
