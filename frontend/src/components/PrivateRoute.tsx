import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Role } from '../util/auth';
import type { ReactNode } from 'react';

type PrivateRouteProps = {
    children: ReactNode;
    roles?: Role[];
};

export function PrivateRoute({ children, roles = [] }: PrivateRouteProps) {
    const { authenticated, hasRole } = useAuth();

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length > 0 && !hasRole(roles)) {
        return <Navigate to="/catalog" replace />;
    }

    return <>{children}</>;
}
