using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_backend_app.Migrations
{
    /// <inheritdoc />
    public partial class addingtalargoftvagoo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Symbols",
                newName: "Sector");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Symbols",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InsCode",
                table: "Symbols",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Symbols");

            migrationBuilder.DropColumn(
                name: "InsCode",
                table: "Symbols");

            migrationBuilder.RenameColumn(
                name: "Sector",
                table: "Symbols",
                newName: "Name");
        }
    }
}
