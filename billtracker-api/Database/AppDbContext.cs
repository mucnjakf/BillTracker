using billtracker_api.Auth;
using billtracker_api.Bills;
using billtracker_api.Categories;
using billtracker_api.Cities;
using billtracker_api.CreditCards;
using billtracker_api.Customers;
using billtracker_api.Items;
using billtracker_api.Products;
using billtracker_api.Sellers;
using billtracker_api.SubCategories;
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
