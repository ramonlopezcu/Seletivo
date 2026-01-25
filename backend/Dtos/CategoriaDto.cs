/**
 * Módulo: CategoriaDto (Data Transfer Object - Camada de Transferência)
 * Função: Este arquivo define o objeto de transferência de dados para as Categorias. 
 * Ele é utilizado para transportar informações de forma otimizada entre o Frontend 
 * e a API, evitando a exposição direta do modelo de dados (entidade de banco). 
 * Contém as propriedades essenciais como Descrição e Finalidade, permitindo a 
 * validação dos dados antes de serem processados pelo CategoriaService.
 */
using ControleGastos.Backend.Models;

namespace ControleGastos.Backend.Dtos
{
    public class CategoriaDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public Finalidade Finalidade { get; set; } // despesa/receita/ambas importante é tipo enum pra fazer match com o REST
    }
}
