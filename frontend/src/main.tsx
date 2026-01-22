/**
 * Módulo: main (Ponto de Inicialização do React)
 * Função: Este é o arquivo de entrada do lado do cliente. Sua única 
 * responsabilidade é localizar o elemento 'root' no HTML principal e 
 * "montar" (renderizar) a aplicação React dentro dele. Ele utiliza o 
 * modo estrito (StrictMode) do React para ajudar a identificar problemas 
 * potenciais durante o desenvolvimento, servindo como a ponte final 
 * entre o código TypeScript e o navegador.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)