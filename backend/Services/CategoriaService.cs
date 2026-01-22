/**
 * Módulo: CategoriaService (Camada de Lógica de Negócio)
 * Função: Este serviço centraliza as regras de negócio para a gestão de categorias. 
 * Ele é responsável por validar a integridade referencial antes de exclusões 
 * (impedindo a remoção de categorias vinculadas a transações) e por realizar a 
 * conversão entre DTOs e modelos de domínio. Garante que as operações de criação, 
 * edição e listagem sigam os requisitos técnicos do sistema.
 */
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Models;
using ControleGastos.Backend.Data; // Asegúrate que este sea tu namespace del Context
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Backend.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Categoria>> ListarAsync() =>
            await _context.Categorias.ToListAsync();

        public async Task<Categoria> CriarAsync(CategoriaDto dto)
        {
            var categoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = (Finalidade)dto.Finalidade
            };
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        // SOLUCIÓN AL ERROR: Método Editar
        public async Task<Categoria?> EditarAsync(int id, CategoriaDto dto)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) return null;

            categoria.Descricao = dto.Descricao;
            categoria.Finalidade = (Finalidade)dto.Finalidade;

            await _context.SaveChangesAsync();
            return categoria;
        }

        // SOLUCIÓN AL ERROR: Método Eliminar
        public async Task<bool> EliminarAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) return false;

            // No permite eliminar si hay transacciones (Integridad referencial)
            var emUso = await _context.Transacoes.AnyAsync(t => t.CategoriaId == id);
            if (emUso) return false;

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}