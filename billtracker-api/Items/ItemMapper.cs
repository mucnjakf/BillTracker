using billtracker_api.Bills;
using billtracker_api.Products;

namespace billtracker_api.Items;

internal static class ItemMapper
{
	internal static ItemDto ToItemDto(this Item item)
	{
		return new(
			item.Id,
			item.Guid,
			item.Quantity,
			item.TotalPrice,
			item.Bill.ToBillDto(),
			item.Product.ToProductDto(),
			item.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}

	internal static ItemListDto ToItemListDto(this Item item)
	{
		return new(
			item.Id,
			item.Product.Name,
			item.Product.Price,
			item.Quantity,
			item.TotalPrice);
	}
}
