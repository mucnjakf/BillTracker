namespace billtracker_api.Products;

internal static class ProductMapper
{
	internal static ProductDto ToProductDto(this Product product)
	{
		return new(
			product.Id,
			product.Guid,
			product.Name,
			product.ProductNumber,
			product.Color,
			product.Price,
			product.SubCategory.Id,
			product.SubCategory.Name,
			product.SubCategory.Category.Id,
			product.SubCategory.Category.Name,
			product.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}

	internal static ProductListDto ToProductListDto(this Product product)
	{
		return new(
			product.Id,
			product.Name,
			product.Price);
	}

	internal static ProductTableDto ToProductTableDto(this Product product)
	{
		return new(
			product.Id,
			product.Name,
			product.ProductNumber,
			product.Price,
			product.CreatedUtc.ToString("dd. MM. yyyy. - HH:mm"));
	}
}
