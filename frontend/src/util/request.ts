import axios from 'axios';
import { BASE_URL } from './system';
import { getToken } from './storage';

export const requestBackend = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
requestBackend.interceptors.request.use(
    function (config) {
        // Add Authorization header to every request EXCEPT the oauth2 token endpoint
        // We only attach tokens to our endpoints. The token endpoint requires Basic Auth which we handle manually.
        if (config.url !== '/oauth2/token') {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
