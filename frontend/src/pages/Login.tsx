import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import loginIllustration from '../assets/login-illustration.png';
import { useAuth } from '../contexts/AuthContext';
import { requestBackend } from '../util/request';
import { CLIENT_ID, CLIENT_SECRET } from '../util/system';
import { toast } from 'sonner';
import { getTokenData } from '../util/auth';
import { usePageTitle } from '../hooks/usePageTitle';

export function Login() {
    usePageTitle('Login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const { loginContext, authenticated, hasRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    if (authenticated) {
        const isAdmin = hasRole(['ROLE_ADMIN']);
        return <Navigate to={isAdmin ? "/admin" : "/catalog"} replace />;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data = new URLSearchParams();
            data.append('username', formData.username);
            data.append('password', formData.password);
            data.append('grant_type', 'password');

            const tokenString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

            const response = await requestBackend.post('/oauth2/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${tokenString}`,
                },
            });

            // Sucesso 🎉
            loginContext(response.data.access_token);

            const tokenData = getTokenData(response.data.access_token);
            const isAdmin = tokenData?.authorities.includes('ROLE_ADMIN');
            const defaultRoute = isAdmin ? '/admin' : '/catalog';
            const from = location.state?.from?.pathname || defaultRoute;

            navigate(from, { replace: true });
            toast.success('Login bem-sucedido!');
        } catch (error) {
            console.error('Erro no login', error);
            toast.error('Usuário ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-muted/20 py-12 px-4 overflow-hidden">

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container max-w-6xl relative z-10 w-full">

                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium mb-6 group transition-colors">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-background group-hover:border-foreground/20 transition-colors shadow-sm">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Voltar para Home
                </Link>

                <div className="bg-background/80 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-border/50 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row w-full min-h-[600px]">

                    {/* Left: Illustration */}
                    <div className="hidden md:flex flex-col flex-1 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-12 items-center justify-center relative border-r border-border/50">
                        <div className="space-y-6 text-center z-10 w-full flex flex-col items-center">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Bem-vindo ao Spring Catalog
                            </h2>
                            <p className="text-muted-foreground text-lg text-balance max-w-sm">
                                Gerencie seus produtos, explore o mercado e alcance novos patamares de vendas.
                            </p>
                        </div>

                        <div className="mt-16 w-full flex justify-center relative z-10">
                            <div className="absolute inset-x-8 -bottom-8 bg-black/10 blur-xl h-12 rounded-[100%]"></div>
                            <img
                                src={loginIllustration}
                                alt="Login Illustration"
                                className="max-w-[320px] lg:max-w-md w-full object-contain relative drop-shadow-2xl mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {/* Right: Login Form */}
                    <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-card">

                        <div className="max-w-md w-full mx-auto space-y-8">

                            <div className="space-y-3 text-center md:text-left">
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">LOGIN</h1>
                                <p className="text-muted-foreground">Insira suas credenciais para continuar.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">


                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground" htmlFor="username">Email</label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="email"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="seu@email.com"
                                            required
                                            className="w-full px-5 py-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base hover:border-border"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-semibold text-foreground" htmlFor="password">Senha</label>
                                            <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                                Esqueci a senha
                                            </a>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full px-5 py-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base pr-12 hover:border-border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 hover:bg-primary/95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 uppercase tracking-wider text-sm disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Entrando...
                                        </>
                                    ) : (
                                        'Fazer Login'
                                    )}
                                </button>
                            </form>

                            <div className="text-center pt-4">
                                <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                                    Não tem uma conta?
                                    <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4">
                                        Cadastre-se
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
