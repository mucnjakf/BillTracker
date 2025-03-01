using billtracker_api.Auth;
using billtracker_api.Database;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;

namespace billtracker_api;

public static class Program
{
	public static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);
		{
			builder.Services
				.AddOpenApi()
				.AddCors(options => options.AddPolicy("AllowAll",
					configure => configure
						.AllowAnyHeader()
						.AllowAnyMethod()
						.AllowAnyOrigin()))
				.AddAuthenticationJwtBearer(options => options.SigningKey = builder.Configuration["Jwt:Secret"])
				.AddAuthorization()
				.AddFastEndpoints()
				.AddSwagger()
				.AddPasswordHasher()
				.AddDatabase(builder.Configuration);
		}

		var app = builder.Build();
		{
			app.MapOpenApi();

			app
				.UseCors("AllowAll")
				.UseHttpsRedirection()
				.UseAuthentication()
				.UseAuthorization()
				.UseFastEndpoints()
				.UseSwaggerGen();

			app.Run();
		}
	}

	private static IServiceCollection AddSwagger(this IServiceCollection services)
	{
		services.SwaggerDocument(options =>
		{
			options.DocumentSettings = settings =>
			{
				settings.Title = "BillTracker API";
				settings.Version = "v1";
			};
			options.AutoTagPathSegmentIndex = 0;
		});

		return services;
	}

	private static IServiceCollection AddPasswordHasher(this IServiceCollection services)
	{
		services.AddSingleton<IPasswordHasher, PasswordHasher>();

		return services;
	}

	private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
	{
		AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

		var connectionString = configuration.GetConnectionString("Default")!;

		services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

		return services;
	}
}
