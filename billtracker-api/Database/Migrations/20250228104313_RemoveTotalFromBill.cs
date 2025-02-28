using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace billtracker_api.Database.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTotalFromBill : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "Bills");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Bills",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
