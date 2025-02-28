using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class SellerMapper
{
	internal static SellerDto ToSellerDto(this Seller seller)
	{
		return new(
			seller.Id,
			seller.Guid,
			seller.Name,
			seller.Surname,
			seller.PermanentEmployee);
	}
}
