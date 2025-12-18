import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(` ${config.method.toUpperCase()} ${config.url}`);
        if (config.data && !(config.data instanceof FormData)) {
            console.log(' Request data:', config.data);
        } else if (config.data instanceof FormData) {
            console.log(' Request FormData:');
            for (let pair of config.data.entries()) {
                console.log(`  ${pair[0]}:`, pair[1]);
            }
        }

        return config;
    },
    (error) => {
        console.error(' Request error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(` ${response.config.method.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        console.log(' Response data:', response.data);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(` ${error.config?.method?.toUpperCase() || 'REQUEST'} ${error.config?.url || 'unknown'} - Status: ${error.response.status}`);
            console.error('Error response:', error.response.data);

            if (error.response.status === 401) {
                console.warn(' No autenticado. Redirigiendo al login...');
                localStorage.removeItem('token');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }

            const errorMessage = error.response.data?.message
                || error.response.data?.error
                || `Error del servidor (${error.response.status})`;

            error.message = errorMessage;
        } else if (error.request) {
            console.error(' No response from server');
            console.error('Request:', error.request);
            error.message = `No se pudo conectar con el servidor. Verifica que el backend esté corriendo en ${API_BASE_URL}`;
        } else {
            console.error(' Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export { apiClient, API_BASE_URL };
export default apiClient;
