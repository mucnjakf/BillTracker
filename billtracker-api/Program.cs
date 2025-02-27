using billtracker_api.Database;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api;

public static class Program
{
	public static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);
		{
			builder.Services.AddOpenApi();

			builder.Services.AddFastEndpoints();

			builder.Services.AddDatabase(builder.Configuration);
		}

		var app = builder.Build();
		{
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}

			app.UseHttpsRedirection();

			app.UseFastEndpoints();

			app.Run();
		}
	}

	private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
	{
		AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

		var connectionString = configuration.GetConnectionString("Default")!;

		services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

		return services;
	}
}
