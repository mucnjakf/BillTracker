using billtracker_api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Database.Configurations;

internal sealed class CreditCardEntityTypeConfiguration : IEntityTypeConfiguration<CreditCard>
{
	public void Configure(EntityTypeBuilder<CreditCard> builder)
	{
		builder.ToTable("CreditCards");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();
	}
}
