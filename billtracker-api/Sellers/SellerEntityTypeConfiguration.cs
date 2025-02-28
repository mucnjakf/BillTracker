using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Sellers;

internal sealed class SellerEntityTypeConfiguration : IEntityTypeConfiguration<Seller>
{
	public void Configure(EntityTypeBuilder<Seller> builder)
	{
		builder.ToTable("Sellers");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();
	}
}
