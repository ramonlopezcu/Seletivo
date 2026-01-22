/**
 * Módulo: types (Definições de Tipos e Interfaces)
 * Função: Este arquivo centraliza os contratos de dados do Frontend. Ele espelha 
 * as entidades do Backend em interfaces TypeScript, garantindo a tipagem forte 
 * em toda a aplicação. Define como os objetos de Pessoa, Categoria e Transação 
 * devem ser estruturados, além de incluir o enum 'Finalidade' e a interface 
 * 'TotaisPessoa', que é utilizada especificamente para a lógica de cálculo 
 * de saldos na página de totais.
 */
export interface Persona {
  id: string;
  nome: string;
  idade: number;
}

export enum Finalidade {
  Receita = 0,
  Despesa = 1,
  Ambas = 2
}

export interface Categoria {
  id: string;
  descricao: string;
  finalidade: Finalidade;
}

export interface Transacao {
  id?: string;
  descricao: string;
  valor: number;
  tipo: number;
  pessoaId: string;
  categoriaId: string;
}

export interface TotaisPessoa {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}