/**
 * Módulo: CategoriasPage (Interface de Usuário)
 * Função: Este componente fornece a interface para a gestão de categorias. 
 * Ele permite que o usuário cadastre novas categorias definindo sua 
 * finalidade (Receita, Despesa ou Ambas) e exibe uma listagem em tempo real. 
 * Além disso, lida com a exclusão de categorias, comunicando-se com o 
 * backend para garantir que as regras de integridade sejam respeitadas.
 */
import React, { useEffect, useState } from 'react';
import { api } from '../api/apiService'; 
import { Categoria } from '../interfaces/types'; 

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState('0'); 
  const [error, setError] = useState<string | null>(null);

  const loadCategorias = async () => {
    try {
      const res = await api.get('/Categoria');
      setCategorias(res.data);
      setError(null);
    } catch (e: any) {
      setError('Erro ao carregar categorias do servidor.');
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Categoria', {
        descricao: descricao,
        finalidade: Number(finalidade)
      });
      
      alert("✅ Categoria adicionada com sucesso!");
      setDescricao('');
      loadCategorias();
    } catch (err: any) {
      setError(err?.response?.data ?? "Erro ao salvar categoria.");
    }
  };

  /**
   * CORREÇÃO DO ERRO: 
   * Alteramos o tipo do id para 'any' ou 'string | number' para evitar o erro de atribuição.
   */
  const handleExcluir = async (id: string | number) => {
    if (window.confirm("Deseja realmente excluir esta categoria?")) {
      try {
        await api.delete(`/Categoria/${id}`);
        loadCategorias();
      } catch (err: any) {
        alert("Não é possível excluir: Categoria está sendo usada em transações.");
      }
    }
  };

  const formatFinalidade = (valor: number) => {
    switch (valor) {
      case 0: return '🟢 Receita';
      case 1: return '🔴 Despesa';
      default: return '🟡 Ambas';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciamento de Categorias</h2>

      {error && (
        <div style={{ color: 'white', backgroundColor: '#d9534f', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <strong>Atenção:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSalvar} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          placeholder="Descrição da Categoria" 
          value={descricao}
          onChange={e => setDescricao(e.target.value)} 
          required 
          style={{ padding: '8px', flex: 2 }}
        />
        
        <select 
          value={finalidade} 
          onChange={e => setFinalidade(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        >
          <option value="0">Receita</option>
          <option value="1">Despesa</option>
          <option value="2">Ambas</option>
        </select>

        <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#5cb85c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Adicionar
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Descrição</th>
            <th>Finalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{c.descricao}</td>
              <td>{formatFinalidade(c.finalidade)}</td>
              <td>
                <button 
                  onClick={() => handleExcluir(c.id)}
                  style={{ color: '#d9534f', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}