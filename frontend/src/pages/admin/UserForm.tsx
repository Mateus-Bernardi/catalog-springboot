import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import type { Role } from '../../types/role';
import { toast } from 'sonner';

export function UserForm() {
    const { id } = useParams();
    const isEditing = id !== undefined;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: [] as Role[],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isEditing) {
            setIsLoading(true);
            requestBackend({ url: `/users/${id}` })
                .then(response => {
                    const user = response.data;
                    setFormData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: '', // Backend doesn't return password
                        confirmPassword: '',
                        roles: user.roles,
                    });
                })
                .catch(err => {
                    console.error('Erro ao buscar usuário', err);
                    setErrorMsg('Erro ao carregar o usuário.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isEditing, id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (roleId: number, authority: string) => {
        setFormData(prev => {
            const hasRole = prev.roles.some(r => r.id === roleId);
            const newRoles = hasRole
                ? prev.roles.filter(r => r.id !== roleId)
                : [...prev.roles, { id: roleId, authority }];
            return { ...prev, roles: newRoles };
        });
    };

    const hasRole = (roleId: number) => {
        return formData.roles.some(r => r.id === roleId);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('As senhas não coincidem.');
            return;
        }

        if (formData.roles.length === 0) {
            setErrorMsg('Selecione pelo menos um papel (role).');
            return;
        }

        setIsSaving(true);
        setErrorMsg('');

        const config = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/users/${id}` : '/users',
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                roles: formData.roles,
                ...(formData.password ? { password: formData.password } : {})
            },
        };

        requestBackend(config)
            .then(() => {
                navigate('/admin/users');
                toast.success('Usuário salvo com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao salvar usuário', error);
                setErrorMsg('Erro ao salvar usuário. Verifique os dados e tente novamente.');
                toast.error('Erro ao salvar usuário.');
            })
            .finally(() => {
                setIsSaving(false);
            });
    };
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/users" className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
                </h1>
            </div>

            <div className="bg-card shadow-sm border border-border/60 rounded-[2rem] p-6 md:p-10 relative overflow-hidden min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">

                    {errorMsg && (
                        <div className="lg:col-span-2 bg-destructive/10 text-destructive text-sm font-semibold p-4 rounded-xl border border-destructive/20 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Nome</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: João"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Sobrenome</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Silva"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="joaodasilva@gmail.com"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                            {isEditing ? 'Nova Senha (opcional)' : 'Senha'}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required={!isEditing}
                            placeholder="••••••••"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground"> Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required={!isEditing || formData.password.length > 0}
                            placeholder="••••••••"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Papel (Roles)</label>
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <label className={`flex items-center gap-2 cursor-pointer p-4 border rounded-xl transition-colors w-full ${hasRole(1) ? 'border-primary bg-primary/5' : 'border-border/60 hover:bg-muted/50'}`}>
                                <input
                                    type="checkbox"
                                    checked={hasRole(1)}
                                    onChange={() => handleRoleChange(1, 'ROLE_OPERATOR')}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="font-medium text-foreground">ROLE_OPERATOR</span>
                            </label>
                            <label className={`flex items-center gap-2 cursor-pointer p-4 border rounded-xl transition-colors w-full ${hasRole(2) ? 'border-primary bg-primary/5' : 'border-border/60 hover:bg-muted/50'}`}>
                                <input
                                    type="checkbox"
                                    checked={hasRole(2)}
                                    onChange={() => handleRoleChange(2, 'ROLE_ADMIN')}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="font-medium text-foreground">ROLE_ADMIN</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-8 lg:col-span-2 border-t border-border/40 flex-col sm:flex-row">
                        <Link to="/admin/users" className="flex-1 flex items-center justify-center bg-background text-foreground font-semibold border-2 border-border/80 px-8 py-4 rounded-xl hover:bg-muted transition-all active:scale-95 text-base uppercase tracking-wider">
                            Cancelar
                        </Link>
                        <button disabled={isSaving || isLoading} type="submit" className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold border-2 border-primary px-8 py-4 rounded-xl hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all active:scale-95 text-base uppercase tracking-wider disabled:opacity-70 disabled:pointer-events-none">
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar Usuário'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
