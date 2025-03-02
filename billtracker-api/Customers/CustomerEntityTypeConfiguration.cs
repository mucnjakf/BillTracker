using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Customers;

internal sealed class CustomerEntityTypeConfiguration : IEntityTypeConfiguration<Customer>
{
	public void Configure(EntityTypeBuilder<Customer> builder)
	{
		builder.ToTable("Customers");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder
			.HasOne(x => x.City)
			.WithMany(x => x.Customers)
			.HasForeignKey(x => x.CityId);
		
		builder.Property(x => x.CreatedUtc).HasDefaultValue(DateTimeOffset.UtcNow);
	}
}
