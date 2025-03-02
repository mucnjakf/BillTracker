using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace billtracker_api.Auth;

internal sealed class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder.ToTable("Users");

		builder.HasKey(x => x.Id);

		builder.Property(x => x.Id).ValueGeneratedOnAdd();

		builder.Property(x => x.CreatedUtc).HasDefaultValue(DateTimeOffset.UtcNow);
	}
}
