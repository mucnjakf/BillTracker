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
			item.Bill.Id,
			item.Bill.Date.ToString("dd. MM. yyyy. - HH:mm"),
			item.Bill.BillNumber,
			item.Bill.Comment,
			$"{item.Bill.Customer.Name} {item.Bill.Customer.Surname}",
			$"{item.Bill.Seller?.Name} {item.Bill.Seller?.Surname}",
			item.Product.Id,
			item.Product.Name,
			item.Product.ProductNumber,
			item.Product.Color,
			item.Product.Price,
			item.Product.SubCategory.Name,
			item.Product.SubCategory.Category.Name,
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

	internal static ItemTableDto ToItemTableDto(this Item item)
	{
		return new(
			item.Id,
			item.Product.Name,
			item.Product.Price,
			item.Quantity,
			item.TotalPrice,
			item.Bill.BillNumber,
			$"{item.Bill.Customer.Name} {item.Bill.Customer.Surname}",
			item.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
