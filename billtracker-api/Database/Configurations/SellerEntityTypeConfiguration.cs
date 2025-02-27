using billtracker_api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Database.Configurations;

internal sealed class SellerEntityTypeConfiguration : IEntityTypeConfiguration<Seller>
{
	public void Configure(EntityTypeBuilder<Seller> builder)
	{
		builder.ToTable("Sellers");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();
	}
}
