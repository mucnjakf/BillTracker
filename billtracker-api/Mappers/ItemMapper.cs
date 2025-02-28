using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

internal static class ItemMapper
{
	internal static ItemTableDto ToItemTableDto(this Item item)
	{
		return new(
			item.Id,
			item.Product.Name,
			item.Product.Price,
			item.Quantity,
			item.TotalPrice);
	}

	internal static ItemDto ToItemDto(this Item item)
	{
		return new(
			item.Id,
			item.Guid,
			item.Quantity,
			item.TotalPrice,
			item.Bill.ToBillDto(),
			item.Product.ToProductDto());
	}
}
