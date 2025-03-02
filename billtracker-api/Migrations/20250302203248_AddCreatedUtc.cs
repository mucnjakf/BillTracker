using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace billtracker_api.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedUtc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 294, DateTimeKind.Unspecified).AddTicks(3172), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "SubCategories",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 310, DateTimeKind.Unspecified).AddTicks(7923), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Sellers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 309, DateTimeKind.Unspecified).AddTicks(5186), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Products",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 308, DateTimeKind.Unspecified).AddTicks(7243), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Items",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 307, DateTimeKind.Unspecified).AddTicks(3967), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Customers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 305, DateTimeKind.Unspecified).AddTicks(3738), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "CreditCards",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 304, DateTimeKind.Unspecified).AddTicks(717), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Cities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 303, DateTimeKind.Unspecified).AddTicks(2917), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Categories",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 302, DateTimeKind.Unspecified).AddTicks(4952), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedUtc",
                table: "Bills",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 301, DateTimeKind.Unspecified).AddTicks(5218), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "SubCategories");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Sellers");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CreatedUtc",
                table: "Bills");
        }
    }
}
