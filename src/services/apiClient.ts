import axios from 'axios';

// A URL base da nossa futura API. Por enquanto, pode ser um placeholder.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Futuramente, podemos adicionar interceptors aqui para lidar com autenticação (tokens JWT),
// tratamento de erros centralizado, etc.
// Ex: apiClient.interceptors.request.use(...)

export default apiClient;