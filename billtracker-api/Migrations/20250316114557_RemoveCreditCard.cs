using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace billtracker_api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCreditCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_CreditCards_CreditCardId",
                table: "Bills");

            migrationBuilder.DropTable(
                name: "CreditCards");

            migrationBuilder.DropIndex(
                name: "IX_Bills_CreditCardId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "CreditCardId",
                table: "Bills");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreditCardId",
                table: "Bills",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CreditCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CardNumber = table.Column<string>(type: "text", nullable: false),
                    CreatedUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false, defaultValue: new DateTimeOffset(new DateTime(2025, 3, 2, 20, 32, 48, 304, DateTimeKind.Unspecified).AddTicks(717), new TimeSpan(0, 0, 0, 0, 0))),
                    ExpirationMonth = table.Column<int>(type: "integer", nullable: false),
                    ExpirationYear = table.Column<int>(type: "integer", nullable: false),
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditCards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bills_CreditCardId",
                table: "Bills",
                column: "CreditCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_CreditCards_CreditCardId",
                table: "Bills",
                column: "CreditCardId",
                principalTable: "CreditCards",
                principalColumn: "Id");
        }
    }
}
