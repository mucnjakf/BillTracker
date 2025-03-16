using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Bills;

internal sealed class BillEntityTypeConfiguration : IEntityTypeConfiguration<Bill>
{
	public void Configure(EntityTypeBuilder<Bill> builder)
	{
		builder.ToTable("Bills");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder
			.HasOne(x => x.Customer)
			.WithMany(x => x.Bills)
			.HasForeignKey(x => x.CustomerId);

		builder
			.HasOne(x => x.Seller)
			.WithMany(x => x.Bills)
			.HasForeignKey(x => x.SellerId);
		
		builder.Property(x => x.CreatedUtc).HasDefaultValue(DateTimeOffset.UtcNow);
	}
}
