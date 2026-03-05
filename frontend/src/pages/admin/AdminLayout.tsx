import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
    const { hasRole } = useAuth();
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <nav className="flex flex-col space-y-2 bg-card rounded-xl shadow-sm border border-border p-4">
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg font-semibold transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                            }`
                        }
                    >
                        Meus Produtos
                    </NavLink>
                    <NavLink
                        to="/admin/categories"
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-lg font-semibold transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                            }`
                        }
                    >
                        Minhas Categorias
                    </NavLink>
                    {hasRole(['ROLE_ADMIN']) && (
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-lg font-semibold transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                                }`
                            }
                        >
                            Meus Usuários
                        </NavLink>
                    )}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <Outlet />
            </main>
        </div>
    );
}
