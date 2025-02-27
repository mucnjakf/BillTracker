using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class SellerMapper
{
	internal static BillSellerDto ToBillSellerDto(this Seller seller)
	{
		return new BillSellerDto(
			seller.Id,
			seller.Guid,
			seller.Name,
			seller.Surname,
			seller.PermanentEmployee);
	}
}
