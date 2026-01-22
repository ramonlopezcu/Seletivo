using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Categorias_CategoryId",
                table: "Transacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_PersonId",
                table: "Transacoes");

            migrationBuilder.RenameColumn(
                name: "PersonId",
                table: "Transacoes",
                newName: "PessoaId");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Transacoes",
                newName: "CategoriaId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacoes_PersonId",
                table: "Transacoes",
                newName: "IX_Transacoes_PessoaId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacoes_CategoryId",
                table: "Transacoes",
                newName: "IX_Transacoes_CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Categorias_CategoriaId",
                table: "Transacoes",
                column: "CategoriaId",
                principalTable: "Categorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_PessoaId",
                table: "Transacoes",
                column: "PessoaId",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Categorias_CategoriaId",
                table: "Transacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_PessoaId",
                table: "Transacoes");

            migrationBuilder.RenameColumn(
                name: "PessoaId",
                table: "Transacoes",
                newName: "PersonId");

            migrationBuilder.RenameColumn(
                name: "CategoriaId",
                table: "Transacoes",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacoes_PessoaId",
                table: "Transacoes",
                newName: "IX_Transacoes_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacoes_CategoriaId",
                table: "Transacoes",
                newName: "IX_Transacoes_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Categorias_CategoryId",
                table: "Transacoes",
                column: "CategoryId",
                principalTable: "Categorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_PersonId",
                table: "Transacoes",
                column: "PersonId",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
