/**
 * Módulo: AppDbContext (Camada de Dados / ORM)
 * Função: Este arquivo define o contexto do Banco de Dados para o Entity Framework Core. 
 * Ele é responsável por estabelecer a ponte entre as classes de modelo (Pessoa, 
 * Categoria, Transacao) e as tabelas reais no banco de dados. O contexto gerencia 
 * o ciclo de vida das entidades, a abertura de conexões e a persistência de 
 * dados através do mapeamento Objeto-Relacional (ORM).
 */
using Microsoft.EntityFrameworkCore;
using ControleGastos.Backend.Models;

namespace ControleGastos.Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }
}
