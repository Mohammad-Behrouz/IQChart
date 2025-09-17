using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_backend_app.Migrations
{
    /// <inheritdoc />
    public partial class discount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "discounts",
                columns: table => new
                {
                    DiscountCodeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    discountCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    discountPercent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_discounts", x => x.DiscountCodeId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "discounts");
        }
    }
}
