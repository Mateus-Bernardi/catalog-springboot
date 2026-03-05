import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import loginIllustration from '../assets/login-illustration.png';
import { requestBackend } from '../util/request';
import { toast } from 'sonner';

export function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrorMsg('');

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('As senhas não coincidem.');
            toast.error('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                roles: [{ id: 1, authority: "ROLE_OPERATOR" }]
            };

            await requestBackend.post('/users', payload);

            toast.success('Cadastro realizado com sucesso!');
            navigate('/catalog', { replace: true });
        } catch (error: any) {
            console.error('Erro no cadastro', error);
            setErrorMsg('Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
            toast.error('Erro ao realizar o cadastro.');
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
                                Junte-se a nós
                            </h2>
                            <p className="text-muted-foreground text-lg text-balance max-w-sm">
                                Crie sua conta e comece a gerenciar seu catálogo de produtos hoje mesmo.
                            </p>
                        </div>
                        <div className="mt-16 w-full flex justify-center relative z-10">
                            <div className="absolute inset-x-8 -bottom-8 bg-black/10 blur-xl h-12 rounded-[100%]"></div>
                            <img
                                src={loginIllustration}
                                alt="Registration Illustration"
                                className="max-w-[320px] lg:max-w-md w-full object-contain relative drop-shadow-2xl mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {/* Right: Register Form */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
                        <div className="max-w-md w-full mx-auto space-y-6">
                            <div className="space-y-2 text-center md:text-left animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">CRIAR CONTA</h1>
                                <p className="text-muted-foreground text-sm">Preencha seus dados para se cadastrar.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {errorMsg && (
                                    <div className="bg-destructive/10 text-destructive text-sm font-semibold p-3 rounded-xl border border-destructive/20 text-center animate-in fade-in zoom-in duration-300">
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-foreground uppercase tracking-wider" htmlFor="firstName">Nome</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="Nome"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm hover:border-border"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-foreground uppercase tracking-wider" htmlFor="lastName">Sobrenome</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Sobrenome"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm hover:border-border"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider" htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="seu@email.com"
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm hover:border-border"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider" htmlFor="password">Senha</label>
                                        <div className="relative group">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm pr-12 hover:border-border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider" htmlFor="confirmPassword">Confirmar Senha</label>
                                        <div className="relative group">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm pr-12 hover:border-border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 hover:bg-primary/95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 uppercase tracking-wider text-sm disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center gap-2 mt-4"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Cadastrando...
                                        </>
                                    ) : (
                                        'Criar Conta'
                                    )}
                                </button>
                            </form>

                            <div className="text-center pt-2">
                                <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                                    Já tem uma conta?
                                    <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">
                                        Faça Login
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
