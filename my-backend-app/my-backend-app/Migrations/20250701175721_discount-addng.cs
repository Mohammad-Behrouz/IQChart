using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_backend_app.Migrations
{
    /// <inheritdoc />
    public partial class discountaddng : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "discount",
                table: "products",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "discount",
                table: "products");
        }
    }
}
