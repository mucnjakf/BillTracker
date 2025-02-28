using billtracker_api.Dtos;
using billtracker_api.Entities;

namespace billtracker_api.Mappers;

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
			product.SubCategory.Category.Name);
	}
}
