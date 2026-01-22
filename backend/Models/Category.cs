/**
 * Módulo: Categoria (Entidade de Domínio)
 * Função: Esta classe representa a entidade Categoria no banco de dados. 
 * Ela define a estrutura fundamental para classificar os lançamentos financeiros, 
 * contendo um identificador único, uma descrição e a finalidade (Receita, 
 * Despesa ou Ambas). É o modelo base utilizado pelo Entity Framework para 
 * o mapeamento da tabela de categorias.
 */
using ControleGastos.Backend.Models;

public class Categoria
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public Finalidade Finalidade { get; set; } // Uso del Enum
}