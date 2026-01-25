egundo/**
 * Módulo: TotaisPage (Relatórios Consolidados)
 * Função: Este é o componente de inteligência financeira do sistema. Ele consolida 
 * todos os dados (Pessoas, Categorias e Transações) para gerar relatórios de 
 * saldos em tempo real. O componente calcula o total de receitas e despesas por 
 * morador e exibe o saldo final de cada um, permitindo uma visão clara da 
 * saúde financeira da residência.
 */
import React, { useState, useEffect } from 'react';
import { api } from '../api/apiService'; // Instância real da API
import { Persona, Transacao, Categoria } from '../interfaces/types'; // Interfaces reais

const TotaisPage = () => {
    // Estados para armazenar os dados crus vindos do Backend
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [transacciones, setTransacciones] = useState<Transacao[]>([]);

    /**
     * Busca sincronizada de todos os dados necessários.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resP, resC, resT] = await Promise.all([
                    api.get('/Pessoa'),
                    api.get('/Categoria'),
                    api.get('/Transacao')
                ]);
                setPersonas(resP.data);
                setCategorias(resC.data);
                setTransacciones(resT.data);
            } catch (err) {
                console.error("Erro ao carregar dados dos totais:", err);
            }
        };
        fetchData();
    }, []);

    /**
     * Função auxiliar para calcular saldos.
     * Mapeamento conforme C#: 0 = Despesa, 1 = Receita. Esto segundo ordem do enum.
     */
    const calcularSaldos = (listaFiltrada: Transacao[]) => {
        const recetas = listaFiltrada
            .filter(t => Number(t.tipo) === 1) 
            .reduce((acc, t) => acc + t.valor, 0);
        const despesas = listaFiltrada
            .filter(t => Number(t.tipo) === 0) 
            .reduce((acc, t) => acc + t.valor, 0);
        return { recetas, despesas, saldo: recetas - despesas };
    };

    const totalGeneral = calcularSaldos(transacciones);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* TABELA 1: TOTALES POR PERSONA */}
            <section>
                <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                    Resumo Financeiro por Pessoa
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead style={{ backgroundColor: '#f4f4f4' }}>
                        <tr style={{ textAlign: 'left' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nome</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Receitas</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Despesas</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map(p => {
                            const { recetas, despesas, saldo } = calcularSaldos(
                                transacciones.filter(t => String(t.pessoaId) === String(p.id))
                            );
                            return (
                                <tr key={p.id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.nome}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'green' }}>R$ {recetas.toFixed(2)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'red' }}>R$ {despesas.toFixed(2)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>R$ {saldo.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

            {/* TABELA 2: TOTALES POR CATEGORIA */}
            <section>
                <h2 style={{ color: '#333', borderBottom: '2px solid #5cb85c', paddingBottom: '10px' }}>
                    Resumo Financeiro por Categoria
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead style={{ backgroundColor: '#f4f4f4' }}>
                        <tr style={{ textAlign: 'left' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Categoria</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Receitas</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Despesas</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(cat => {
                            const { recetas, despesas, saldo } = calcularSaldos(
                                transacciones.filter(t => String(t.categoriaId) === String(cat.id))
                            );
                            return (
                                <tr key={cat.id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{cat.descricao}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'green' }}>R$ {recetas.toFixed(2)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'red' }}>R$ {despesas.toFixed(2)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>R$ {saldo.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    {/* TOTAL GERAL DO SISTEMA */}
                    <tfoot style={{ backgroundColor: '#333', color: 'white', fontWeight: 'bold' }}>
                        <tr>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>TOTAL GERAL</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>R$ {totalGeneral.recetas.toFixed(2)}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>R$ {totalGeneral.despesas.toFixed(2)}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>R$ {totalGeneral.saldo.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </div>
    );
};

export default TotaisPage;
