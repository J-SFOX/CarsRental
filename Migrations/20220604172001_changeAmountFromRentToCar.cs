using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarsRental.Migrations
{
    public partial class changeAmountFromRentToCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Rent");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Car",
                type: "double",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Car");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Rent",
                type: "double",
                nullable: true);
        }
    }
}
