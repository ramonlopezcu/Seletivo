/**
 * Módulo: PessoaService (Camada de Lógica de Negócio)
 * Função: Responsável pelo gerenciamento dos dados dos residentes (Pessoas). 
 * Este serviço lida com a persistência de novos perfis, atualizações e a 
 * exclusão segura de registros. Inclui a lógica para tratar a remoção em 
 * cascata ou proteção de vínculos, assegurando que o estado do banco de dados 
 * permaneça consistente e que os dados das pessoas estejam sempre acessíveis 
 * para os relatórios financeiros.
 */
using ControleGastos.Backend.Data;
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Backend.Services
{
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        // LISTAR TODAS
        public async Task<List<PessoaDto>> ListarAsync()
        {
            return await _context.Pessoas
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .ToListAsync();
        }

        // BUSCAR POR ID
        public async Task<PessoaDto?> BuscarPorIdAsync(int id)
        {
            return await _context.Pessoas
                .Where(p => p.Id == id)
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .FirstOrDefaultAsync();
        }

        // CRIAR
        public async Task<PessoaDto> CriarAsync(PessoaDto dto)
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            dto.Id = pessoa.Id;
            return dto;
        }

        // ATUALIZAR
        public async Task<bool> AtualizarAsync(int id, PessoaDto dto)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
                return false;

            pessoa.Nome = dto.Nome;
            pessoa.Idade = dto.Idade;

            await _context.SaveChangesAsync();
            return true;
        }

        // DELETAR (com remoção de transações)
        public async Task<bool> DeletarAsync(int id)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (pessoa == null)
                return false;

            _context.Transacoes.RemoveRange(pessoa.Transacoes); //Remove as transações primeiro
            _context.Pessoas.Remove(pessoa);                    //Remove pessoa depois

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
