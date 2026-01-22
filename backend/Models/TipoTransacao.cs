/**
 * Módulo: TipoTransacao (Enum / Tipo Enumerado)
 * Função: Define a natureza financeira de um lançamento individual. É utilizado 
 * em cada Transação para especificar se o valor representa uma saída (Despesa) 
 * ou uma entrada (Receita), servindo como base para os cálculos de saldo 
 * total no sistema.
 */
namespace ControleGastos.Backend.Models;

public enum TipoTransacao
{
    Despesa,
    Receita
}
