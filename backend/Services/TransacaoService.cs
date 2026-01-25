/**
 * Módulo: TransacaoService (Camada de Lógica de Negócio Crítica)
 * Função: Implementa as regras mais restritivas do sistema financeiro. 
 * Este serviço valida se um menor de 18 anos está tentando registrar uma 
 * receita e verifica se a categoria escolhida é compatível com o tipo de 
 * transação (Receita vs Despesa). É o componente responsável por garantir 
 * que todos os lançamentos financeiros estejam corretos antes de atualizar 
 * os saldos no banco de dados.
 */
using ControleGastos.Backend.Data;
using ControleGastos.Backend.Dtos;
using ControleGastos.Backend.Models;

using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Backend.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        // LISTAR TODAS
        public async Task<List<TransacaoDto>> ListarAsync()
        {
            return await _context.Transacoes
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    CategoriaId = t.CategoriaId,
                    PessoaId = t.PessoaId
                })
                .ToListAsync();
        }

        // BUSCAR POR ID
        public async Task<TransacaoDto?> BuscarPorIdAsync(int id)
        {
            return await _context.Transacoes
                .Where(t => t.Id == id)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    CategoriaId = t.CategoriaId,
                    PessoaId = t.PessoaId
                })
                .FirstOrDefaultAsync();
        }

        // Dentro de TransacaoService.cs
        // CRIAR
        public async Task<string?> CriarAsync(TransacaoDto dto)
        {
            // 1. Usamos o método de validação que já criei lá embaixo
            var erro = await ValidarRegrasAsync(dto);
            if (erro != null) return erro;

            // 2. Mapeamos o DTO para a Entidade Model (o que vai para o banco)
            var novaTransacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            // 3. ADICIONAMOS AO CONTEXTO E SALVAMOS 
            try
            {
                _context.Transacoes.Add(novaTransacao);
                await _context.SaveChangesAsync();
                return null; // Retorna null para indicar que deu tudo certo
            }
            catch (Exception ex)
            {
                return "Erro interno ao salvar no banco: " + ex.Message;
            }
        }

        // ATUALIZAR
        public async Task<string?> AtualizarAsync(int id, TransacaoDto dto)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
                return "Transação não encontrada.";

            var erro = await ValidarRegrasAsync(dto);
            if (erro != null) return erro;

            transacao.Descricao = dto.Descricao;
            transacao.Valor = dto.Valor;
            transacao.Tipo = dto.Tipo;
            transacao.CategoriaId = dto.CategoriaId;
            transacao.PessoaId = dto.PessoaId;

            await _context.SaveChangesAsync();
            return null;
        }

        // DELETAR
        public async Task<bool> DeletarAsync(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
                return false;

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }

        // LISTAR POR PESSOA
        public async Task<List<TransacaoDto>> ListarPorPessoaAsync(int pessoaId)
        {
            return await _context.Transacoes
                .Where(t => t.PessoaId == pessoaId)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    CategoriaId = t.CategoriaId,
                    PessoaId = t.PessoaId
                })
                .ToListAsync();
        }

        // LISTAR POR CATEGORIA
        public async Task<List<TransacaoDto>> ListarPorCategoriaAsync(int categoriaId)
        {
            return await _context.Transacoes
                .Where(t => t.CategoriaId == categoriaId)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    CategoriaId = t.CategoriaId,
                    PessoaId = t.PessoaId
                })
                .ToListAsync();
        }

        public async Task<bool> ExcluirAsync(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null) return false;

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }
        
        // ==============================
        // VALIDAÇÕES
        // ==============================
        private async Task<string?> ValidarRegrasAsync(TransacaoDto dto)
        {
            // PESSOA EXISTS
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
            if (pessoa == null)
                return "Pessoa não encontrada.";

            // REGLA: menores de 18 não podem registrar receita
            if (pessoa != null && pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            {
                return "Menores de 18 anos só podem registrar DESPESAS."; // Este erro será retornado como BadRequest com uma mensagem 
            }

            // CATEGORIA EXISTS
            var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
            if (categoria == null)
                return "Categoria não encontrada.";

            // VALIDA TIPO VS FINALIDADE
            if (dto.Tipo == TipoTransacao.Despesa && categoria.Finalidade == Finalidade.Receita)
                return "Categoria de receita não pode ser usada para despesa.";

            if (dto.Tipo == TipoTransacao.Receita && categoria.Finalidade == Finalidade.Despesa)
                return "Categoria de despesa não pode ser usada para receita.";

            return null;
        }
    }
}
