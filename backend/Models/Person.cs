/**
 * Módulo: Pessoa (Entidade de Domínio)
 * Função: Representa o morador/residente no sistema de controle de gastos. 
 * Além de armazenar dados básicos como Nome e Idade (usada para a validação 
 * de menoridade em receitas), ela estabelece a relação "um para muitos" 
 * com as Transações, permitindo que o sistema rastreie todos os lançamentos 
 * vinculados a cada indivíduo através da propriedade de navegação 'Transacoes'.
 */
namespace ControleGastos.Backend.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }

    public List<Transacao> Transacoes { get; set; } = new();
}
