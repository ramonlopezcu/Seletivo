/**
 * Módulo: Transacao (Entidade de Domínio)
 * Função: É o núcleo financeiro do sistema. Esta classe mapeia a tabela de 
 * lançamentos, consolidando as informações de valor, descrição e tipo. 
 * Ela estabelece os relacionamentos fundamentais (chaves estrangeiras) com 
 * Categoria e Pessoa, garantindo que cada transação esteja devidamente 
 * classificada e atribuída a um morador.
 */
namespace ControleGastos.Backend.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; } = null!;
    }
}
