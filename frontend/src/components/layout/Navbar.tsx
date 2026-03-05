import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
    const { authenticated, tokenData, hasRole, logoutContext } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutContext();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">

                    <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hover:text-primary transition-colors duration-200">
                        Spring Catalog
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to="/catalog"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                        }
                    >
                        CATÁLOGO
                    </NavLink>
                    {hasRole(['ROLE_ADMIN']) && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                            }
                        >
                            ADMIN
                        </NavLink>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {authenticated ? (
                        <div className="hidden md:flex items-center gap-4">
                            <span className="font-semibold text-sm text-foreground/90">{tokenData?.user_name}</span>
                            <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground h-10 px-6">
                                SAIR
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 shadow-md shadow-primary/20">
                            LOGIN
                        </Link>
                    )}
                    <button className="md:hidden p-2 text-foreground/80 hover:bg-muted rounded-full transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
