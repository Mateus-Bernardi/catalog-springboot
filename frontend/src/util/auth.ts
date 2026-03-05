import { jwtDecode } from 'jwt-decode';

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
};

export function getTokenData(token: string): TokenData | undefined {
    try {
        return jwtDecode(token) as TokenData;
    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(token: string): boolean {
    const tokenData = getTokenData(token);
    return tokenData !== undefined && tokenData.exp * 1000 > Date.now();
}

