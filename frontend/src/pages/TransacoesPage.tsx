/**
 * Módulo: TransacoesPage (Núcleo de Movimentação Financeira)
 * Função: Este componente é o mais complexo do Frontend. Ele permite o registro 
 * detalhado de transações vinculando-as a uma pessoa e uma categoria. 
 * É responsável por tratar os erros de validação retornados pelo Backend 
 * (como a regra de idade e categorias incompatíveis) e exibir o histórico 
 * completo de lançamentos, fornecendo feedback imediato ao usuário através 
 * de alertas e atualizações de lista.
 */
import React, { useEffect, useState } from 'react'; // Importação do React adicionada para corrigir o ReferenceError
import { api } from '../api/apiService';
import { Transacao, Persona, Categoria } from '../interfaces/types';

export default function TransacoesPage() {
  // Estados para dados carregados do Backend
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Estados para o formulário (conforme sua imagem a8dee2)
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState('despesa');
  const [pessoaId, setPessoaId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega os dados iniciais necessários para popular os selects e a lista.
   */
  const loadInitialData = async () => {
    try {
      const [resT, resP, resC] = await Promise.all([
        api.get('/Transacao'),
        api.get('/Pessoa'),
        api.get('/Categoria')
      ]);
      setTransacoes(resT.data);
      setPersonas(resP.data);
      setCategorias(resC.data);
      setError(null);
    } catch (e: any) {
      setError('Erro ao carregar dados do servidor. Verifique a conexão com o Backend.');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Função para salvar a transação com validações de regra de negócio no Frontend.
   */
  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mapeamento: Despesa = 0, Receita = 1 (Conforme o Enum do seu C#)
    const tipoNumerico = tipo === 'despesa' ? 0 : 1;

    // 1. Validação de Idade (Regra de Negócio)
    const personaSelecionada = personas.find(p => String(p.id) === String(pessoaId));
    if (personaSelecionada && personaSelecionada.idade < 18 && tipoNumerico === 1) {
      alert("⚠️ OPERAÇÃO BLOQUEADA: Menores de 18 anos não podem registrar RECEITAS.");
      return;
    }

    // 2. Validação de Categoria vs Tipo (Regra de Negócio conforme sua imagem a8dee2)
    const categoriaSelecionada = categorias.find(c => String(c.id) === String(categoriaId));
    if (categoriaSelecionada) {
      // Se tipo é Despesa (0) mas categoria é exclusiva para Receitas (finalidade 0)
      if (tipoNumerico === 0 && Number(categoriaSelecionada.finalidade) === 0) {
        alert(`⚠️ CATEGORIA INVÁLIDA: ${categoriaSelecionada.descricao} é exclusiva para RECEITAS.`);
        return;
      }
      // Se tipo é Receita (1) mas categoria é exclusiva para Despesas (finalidade 1)
      if (tipoNumerico === 1 && Number(categoriaSelecionada.finalidade) === 1) {
        alert(`⚠️ CATEGORIA INVÁLIDA: ${categoriaSelecionada.descricao} é exclusiva para DESPESAS.`);
        return;
      }
    }

    try {
      await api.post('/Transacao', {
        descricao: descricao,
        valor: Number(valor),
        tipo: tipoNumerico,
        pessoaId: Number(pessoaId),
        categoriaId: Number(categoriaId)
      });

      alert("✅ SUCESSO: Transação cadastrada com êxito!");
      setDescricao(''); // Limpa o formulário
      setValor(0);
      loadInitialData(); // Recarrega a lista sem precisar dar reload na página inteira
    } catch (err: any) {
      setError(err?.response?.data ?? "O servidor rejeitou o lançamento. Verifique os dados.");
    }
  };

  /**
   * Lógica de Exclusão de Transação
   * Resolve o problema de falha silenciosa ao tentar limpar registros em uso.
   * Implementa feedback visual e atualização de estado após remoção no banco.
   */
const handleExcluirTransacao = async (id?: number | string) => {
  if (!id) return; // Se não houver ID, a função para aqui
  
  if (window.confirm("Deseja excluir este lançamento?")) {
    try {
      await api.delete(`/Transacao/${id}`);
      alert("✅ Transação excluída!");
      loadInitialData();
    } catch (err: any) {
      alert("Erro ao excluir: " + (err.response?.data ?? "Erro desconhecido"));
    }
  }
}; return (
    <div style={{ padding: '20px' }}>
      <h2>Nova Transação</h2>

      {error && (
        <div style={{ color: 'white', backgroundColor: '#d9534f', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          placeholder="Descrição (ex: Aluguel)"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
          style={{ padding: '8px' }}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Valor (R$)"
          value={valor}
          onChange={e => setValor(Number(e.target.value))}
          required
          style={{ padding: '8px' }}
        />

        <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ padding: '8px' }}>
          <option value="despesa">🔴 Despesa</option>
          <option value="receita">🟢 Receita</option>
        </select>

        <select value={pessoaId} onChange={e => setPessoaId(e.target.value)} required style={{ padding: '8px' }}>
          <option value="">Selecione uma Pessoa...</option>
          {personas.map(p => (
            <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>
          ))}
        </select>

        <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required style={{ padding: '8px' }}>
          <option value="">Selecione uma Categoria...</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.descricao}</option>
          ))}
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#0275d8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrar Transação
        </button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h3>Histórico de Lançamentos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* ... Histórico de Lançamentos ... */}
          {transacoes.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{t.tipo === 1 ? '🟢 Receita' : '🔴 Despesa'}</td>
              <td>{t.descricao}</td>
              <td style={{ fontWeight: 'bold' }}>R$ {t.valor.toFixed(2)}</td>

              {/* ESTE É O PONTO 3: A COLUNA DE AÇÕES */}
              <td style={{ textAlign: 'right' }}>
                <button
                  onClick={() => handleExcluirTransacao(t.id)}
                  style={{
                    color: '#dc3545',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}        </tbody>
      </table>
    </div>
  );
}