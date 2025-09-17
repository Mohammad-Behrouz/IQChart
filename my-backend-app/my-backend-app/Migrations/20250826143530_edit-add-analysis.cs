using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_backend_app.Migrations
{
    /// <inheritdoc />
    public partial class editaddanalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analyses_Symbols_SymbolId",
                table: "Analyses");

            migrationBuilder.DropIndex(
                name: "IX_Analyses_SymbolId",
                table: "Analyses");

            migrationBuilder.AlterColumn<decimal>(
                name: "SymbolId",
                table: "Analyses",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SymbolId1",
                table: "Analyses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Analyses_SymbolId1",
                table: "Analyses",
                column: "SymbolId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Analyses_Symbols_SymbolId1",
                table: "Analyses",
                column: "SymbolId1",
                principalTable: "Symbols",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analyses_Symbols_SymbolId1",
                table: "Analyses");

            migrationBuilder.DropIndex(
                name: "IX_Analyses_SymbolId1",
                table: "Analyses");

            migrationBuilder.DropColumn(
                name: "SymbolId1",
                table: "Analyses");

            migrationBuilder.AlterColumn<int>(
                name: "SymbolId",
                table: "Analyses",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.CreateIndex(
                name: "IX_Analyses_SymbolId",
                table: "Analyses",
                column: "SymbolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Analyses_Symbols_SymbolId",
                table: "Analyses",
                column: "SymbolId",
                principalTable: "Symbols",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
