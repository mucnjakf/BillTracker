using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api;

public static class Program
{
	public static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);
		{
			builder.Services.AddOpenApi();

			builder.Services
				.AddFastEndpoints()
				.SwaggerDocument(options =>
				{
					options.DocumentSettings = settings =>
					{
						settings.Title = "BillTracker API";
						settings.Version = "v1";
					};
					options.AutoTagPathSegmentIndex = 0;
				});

			builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();

			builder.Services.AddDatabase(builder.Configuration);
		}

		var app = builder.Build();
		{
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}

			app.UseHttpsRedirection();

			app.UseFastEndpoints()
				.UseSwaggerGen();

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
