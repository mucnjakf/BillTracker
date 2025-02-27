using billtracker_api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Database.Configurations;

internal sealed class ItemEntityTypeConfiguration : IEntityTypeConfiguration<Item>
{
	public void Configure(EntityTypeBuilder<Item> builder)
	{
		builder.ToTable("Items");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder
			.HasOne(x => x.Bill)
			.WithMany(x => x.Items)
			.HasForeignKey(x => x.BillId);
		
		builder
			.HasOne(x => x.Product)
			.WithMany(x => x.Items)
			.HasForeignKey(x => x.ProductId);
	}
}
