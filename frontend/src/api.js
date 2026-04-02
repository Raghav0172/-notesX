const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app';

export const apiClient = {
  get: (endpoint, config = {}) => 
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      ...config
    }).then(r => r.json()),

  post: (endpoint, data, config = {}) => 
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data),
      ...config
    }).then(r => r.json()),

  put: (endpoint, data, config = {}) => 
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data),
      ...config
    }).then(r => r.json())
};

export default API_BASE_URL;
