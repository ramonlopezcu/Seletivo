/**
 * Módulo: TransacaoDto (Data Transfer Object - Camada de Transferência)
 * Função: Este arquivo define o objeto de transferência de dados para as Transações. 
 * Ele é essencial para o fluxo de entrada de dados no sistema, permitindo que o 
 * Frontend envie as informações de novos lançamentos (Descrição, Valor, Tipo, 
 * Categoria e Pessoa) de forma estruturada. O DTO garante que apenas os dados 
 * necessários sejam trafegados na rede antes de serem convertidos em uma entidade 
 * de domínio pelo TransacaoService.
 */
using ControleGastos.Backend.Models;

namespace ControleGastos.Backend.Dtos
{
    public class TransacaoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public int CategoriaId { get; set; }
        public int PessoaId { get; set; }
    }
}
