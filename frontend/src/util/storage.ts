export const TOKEN_KEY = 'com.mateus.catalog/Token';

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) ?? '';
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}
