/**
 * Módulo: PessoasPage (Interface de Usuário)
 * Função: Gerencia o cadastro de moradores/residentes. Este componente exibe 
 * uma lista de pessoas registradas com sua idade e classificação (Menor ou Adulto). 
 * É aqui que os dados iniciais dos usuários são inseridos, servindo como base 
 * fundamental para as validações de regras de negócio em outros módulos do sistema.
 */
import React, { useEffect, useState } from 'react';
import { api } from '../api/apiService'; // Importação da instância centralizada da API
import { Persona } from '../interfaces/types'; // Interface correta conforme sua estrutura

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Persona[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega a lista de pessoas do banco de dados.
   */
  const loadPessoas = async () => {
    try {
      const res = await api.get('/Pessoa');
      setPessoas(res.data);
      setError(null);
    } catch (e: any) {
      setError('Erro ao carregar a lista de pessoas.');
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  /**
   * Envia os dados para cadastrar uma nova pessoa.
   */
  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Pessoa', {
        nome: nome,
        idade: Number(idade)
      });
      
      alert("✅ Pessoa cadastrada com sucesso!");
      setNome('');
      setIdade('');
      loadPessoas(); // Atualiza a lista após o cadastro
    } catch (err: any) {
      setError(err?.response?.data ?? "Erro ao salvar os dados da pessoa.");
    }
  };

  /**
   * Remove uma pessoa. 
   * Nota: O parâmetro aceita string ou number para evitar erros de tipagem do TypeScript.
   */
  const handleExcluir = async (id: string | number) => {
    if (window.confirm("Deseja realmente remover esta pessoa?")) {
      try {
        await api.delete(`/Pessoa/${id}`);
        loadPessoas();
      } catch (err: any) {
        alert("Não é possível excluir: esta pessoa possui transações vinculadas no banco de dados.");
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciamento de Pessoas</h2>

      {error && (
        <div style={{ color: 'white', backgroundColor: '#d9534f', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSalvar} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          placeholder="Nome Completo" 
          value={nome}
          onChange={e => setNome(e.target.value)} 
          required 
          style={{ padding: '8px', flex: 2 }}
        />
        
        <input 
          type="number"
          placeholder="Idade" 
          value={idade}
          onChange={e => setIdade(e.target.value === '' ? '' : Number(e.target.value))} 
          required 
          style={{ padding: '8px', flex: 1 }}
        />

        <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#0275d8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>

      {/* Tabela de Exibição Limpa e Profissional */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Nome</th>
            <th>Idade</th>
            <th>Classificação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{p.nome}</td>
              <td>{p.idade} anos</td>
              <td>
                {p.idade < 18 ? 
                  <span style={{ color: '#f0ad4e', fontWeight: 'bold' }}>🔸 Menor</span> : 
                  <span style={{ color: '#5cb85c', fontWeight: 'bold' }}>🔹 Adulto</span>
                }
              </td>
              <td>
                <button 
                  onClick={() => handleExcluir(p.id)}
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