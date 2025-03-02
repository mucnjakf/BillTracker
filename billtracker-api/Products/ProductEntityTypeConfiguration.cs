using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Products;

internal sealed class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
{
	public void Configure(EntityTypeBuilder<Product> builder)
	{
		builder.ToTable("Products");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder
			.HasOne(x => x.SubCategory)
			.WithMany(x => x.Products)
			.HasForeignKey(x => x.SubCategoryId);
		
		builder.Property(x => x.CreatedUtc).HasDefaultValue(DateTimeOffset.UtcNow);
	}
}
