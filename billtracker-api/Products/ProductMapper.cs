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
			product.SubCategory.Name,
			product.SubCategory.Category.Name,
			product.CreatedUtc);
	}
}
