using billtracker_api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Database.Configurations;

internal sealed class CityEntityTypeConfiguration : IEntityTypeConfiguration<City>	
{
	public void Configure(EntityTypeBuilder<City> builder)
	{
		builder.ToTable("Cities");
		
		builder.HasKey(x => x.Id);
		
		builder.Property(x => x.Id).ValueGeneratedOnAdd();
	}
}
