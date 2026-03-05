import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getToken, removeToken, saveToken } from '../util/storage';
import { getTokenData, isAuthenticated } from '../util/auth';
import type { Role, TokenData } from '../util/auth';

export type AuthContextData = {
    authenticated: boolean;
    tokenData?: TokenData;
    loginContext: (accessToken: string) => void;
    logoutContext: () => void;
    hasRole: (roles: Role[]) => boolean;
};

export const AuthContext = createContext<AuthContextData>({
    authenticated: false,
    loginContext: () => { },
    logoutContext: () => { },
    hasRole: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authContextData, setAuthContextData] = useState<{ authenticated: boolean; tokenData?: TokenData }>({
        authenticated: false
    });

    useEffect(() => {
        const token = getToken();
        if (isAuthenticated(token)) {
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData(token),
            });
        } else {
            setAuthContextData({
                authenticated: false,
            });
            removeToken();
        }
    }, []);

    const loginContext = (accessToken: string) => {
        saveToken(accessToken);
        setAuthContextData({
            authenticated: true,
            tokenData: getTokenData(accessToken),
        });
    };

    const logoutContext = () => {
        removeToken();
        setAuthContextData({
            authenticated: false,
        });
    };

    const hasRole = (roles: Role[]) => {
        if (!authContextData.tokenData || !authContextData.authenticated) {
            return false;
        }
        if (roles.length === 0) {
            return true;
        }
        return roles.some(role => authContextData.tokenData?.authorities.includes(role));
    }

    return (
        <AuthContext.Provider value={{ ...authContextData, loginContext, logoutContext, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
