/**
 * Módulo: App (Configuração de Rotas e Layout Global)
 * Função: Este componente é a espinha dorsal do Frontend. Ele utiliza o 
 * 'react-router-dom' para gerenciar a navegação entre as diferentes páginas 
 * do sistema (Pessoas, Categorias, Transações e Totais). Além disso, define 
 * a estrutura visual comum, como a barra de navegação superior (Navbar), 
 * garantindo que o usuário possa alternar entre as funcionalidades de 
 * forma fluida e intuitiva.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoriasPage from './pages/CategoriasPage';
import PessoasPage from './pages/PessoasPage';
import TransacoesPage from './pages/TransacoesPage';
import TotaisPage from './pages/TotaisPage';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Pessoas</Link>
          <Link to="/categorias" style={{ color: 'white', textDecoration: 'none' }}>Categorias</Link>
          <Link to="/transacoes" style={{ color: 'white', textDecoration: 'none' }}>Transações</Link>
          <Link to="/totais" style={{ color: 'white', textDecoration: 'none' }}>Consulta de Totais</Link>
        </nav>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PessoasPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
            <Route path="/totais" element={<TotaisPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;