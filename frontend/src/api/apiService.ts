/**
 * Módulo: apiService (Configuração de Comunicação HTTP)
 * Função: Este arquivo centraliza a configuração do cliente HTTP utilizando Axios. 
 * Ele define a 'baseURL' apontando para o servidor Backend (porta 5000), 
 * garantindo que todas as requisições (GET, POST, DELETE) sejam direcionadas 
 * corretamente. Além disso, exporta funções utilitárias que encapsulam as 
 * chamadas para a API de Pessoas, facilitando o reuso de código e a 
 * manutenção das rotas em um único local.
 */
import axios from 'axios';

export const api = axios.create({
  // Según tu imagen de Swagger, el puerto es el 5000
  baseURL: 'http://localhost:5000/api', 
});

// Ejemplo de funciones de ayuda
export const getPersonas = () => api.get('/Pessoa');
export const createPersona = (data: any) => api.post('/Pessoa', data);
export const deletePersona = (id: string) => api.delete(`/Pessoa/${id}`);