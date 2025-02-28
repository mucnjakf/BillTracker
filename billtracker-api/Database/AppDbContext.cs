using billtracker_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api.Database;

internal sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
	public DbSet<Bill> Bills { get; set; }

	public DbSet<Category> Categories { get; set; }

	public DbSet<City> Cities { get; set; }

	public DbSet<CreditCard> CreditCards { get; set; }

	public DbSet<Customer> Customers { get; set; }

	public DbSet<Item> Items { get; set; }

	public DbSet<Product> Products { get; set; }

	public DbSet<Seller> Sellers { get; set; }

	public DbSet<SubCategory> SubCategories { get; set; }

	public DbSet<User> Users { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
	}
}
