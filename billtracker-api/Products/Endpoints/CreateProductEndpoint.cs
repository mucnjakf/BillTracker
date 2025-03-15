using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Products.Endpoints;

internal sealed record CreateProductRequest(
	string Name,
	string ProductNumber,
	string Color,
	decimal Price,
	int SubCategoryId);

internal sealed class CreateProductEndpoint(AppDbContext appDbContext)
	: Endpoint<CreateProductRequest, Results<Created<ProductDto>, NotFound, BadRequest>>
{
	public override void Configure()
	{
		Roles(AppRoles.User);
		Post(AppRoutes.Products);
		Description(x => x.WithTags(AppRouteTags.Products));
	}

	public override async Task<Results<Created<ProductDto>, NotFound, BadRequest>> ExecuteAsync(CreateProductRequest req, CancellationToken ct)
	{
		var subCategory = await appDbContext.SubCategories
			.AsNoTracking()
			.SingleOrDefaultAsync(x => x.Id == req.SubCategoryId, ct);

		if (subCategory is null)
		{
			return TypedResults.NotFound();
		}

		var product = new Product
		{
			Name = req.Name,
			ProductNumber = req.ProductNumber,
			Color = req.Color,
			Price = req.Price,
			SubCategoryId = subCategory.Id
		};

		await appDbContext.Products.AddAsync(product, ct);
		await appDbContext.SaveChangesAsync(ct);

		product = await appDbContext.Products
			.AsNoTracking()
			.Include(x => x.SubCategory)
			.ThenInclude(x => x.Category)
			.SingleOrDefaultAsync(x => x.Id == product.Id, ct);

		var productDto = product!.ToProductDto();

		return TypedResults.Created($"{HttpContext.Request.Host}/api/products/{productDto.Id}", productDto);
	}
}
