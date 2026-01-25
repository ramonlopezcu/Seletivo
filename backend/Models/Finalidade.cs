/**
 * Módulo: Finalidade (Enum / Tipo Enumerado)
 * Função: Define os valores constantes permitidos para a finalidade de uma 
 * categoria. No contexto do exame, este enum é crucial para as regras de 
 * negócio, permitindo distinguir se uma categoria aceita apenas Receitas (0), 
 * apenas Despesas (1) ou ambos os tipos de transações (2).
 */
namespace ControleGastos.Backend.Models
{
    public enum Finalidade //Muito importante ter em conta que é ENUM porque no Frontend tinha string e da erro
    {
        Receita = 0,
        Despesa = 1,
        Ambas = 2
    }
}
