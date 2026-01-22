/**
 * Módulo: PessoaDto (Data Transfer Object - Camada de Transferência)
 * Função: Este arquivo define o objeto de transferência de dados para a entidade Pessoa. 
 * Ele é utilizado para transportar informações de forma segura e otimizada entre o 
 * Frontend e o Backend, contendo os campos necessários (Id, Nome e Idade) para o 
 * cadastro e exibição de residentes. O uso do DTO isola o modelo de domínio do banco 
 * de dados das informações enviadas pela interface do usuário.
 */
namespace ControleGastos.Backend.Dtos
{
    public class PessoaDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}
