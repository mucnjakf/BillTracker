using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.SubCategories;

internal sealed class SubCategoryEntityTypeConfiguration : IEntityTypeConfiguration<SubCategory>
{
	public void Configure(EntityTypeBuilder<SubCategory> builder)
	{
		builder.ToTable("SubCategories");

		builder.HasKey(x => x.Id);

		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder
			.HasOne(x => x.Category)
			.WithMany(x => x.SubCategories)
			.HasForeignKey(x => x.CategoryId);
	}
}
