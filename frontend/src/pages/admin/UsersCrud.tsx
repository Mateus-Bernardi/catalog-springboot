import { Edit, Plus, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import type { User } from '../../types/user';
import type { SpringPage } from '../../types/spring';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { usePageTitle } from '../../hooks/usePageTitle';

export function UsersCrud() {
    usePageTitle('Usuários — Admin');
    const { hasRole } = useAuth();
    const [page, setPage] = useState<SpringPage<User>>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getUsers = useCallback((pageNumber: number) => {
        setIsLoading(true);
        requestBackend({ url: '/users', params: { page: pageNumber, size: 10, sort: 'firstName,asc' } })
            .then(response => {
                setPage(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        getUsers(activePage);
    }, [getUsers, activePage]);



    const handleDelete = (id: number) => {
        toast('Tem certeza que deseja excluir este usuário?', {
            action: {
                label: 'Sim, excluir',
                onClick: () => {
                    requestBackend({ method: 'DELETE', url: `/users/${id}` })
                        .then(() => {
                            getUsers(activePage);
                            toast.success('Usuário excluído com sucesso.');
                        })
                        .catch(err => {
                            console.error('Erro ao excluir usuário', err);
                            toast.error('Erro ao excluir usuário.');
                        });
                }
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => { }
            }
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {hasRole(['ROLE_ADMIN']) && (
                    <Link to="/admin/users/form" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap tracking-wide shadow-sm flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" />
                        ADICIONAR
                    </Link>
                )}
            </div>

            {/* Users List */}
            <div className="bg-card shadow-sm border border-border/60 rounded-[1.25rem] overflow-hidden relative min-h-[300px]">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : null}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border/60">
                                <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider w-20">ID</th>
                                <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Nome Completo</th>
                                <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Email</th>
                                <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Papel</th>
                                {hasRole(['ROLE_ADMIN']) && (
                                    <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider text-right">Ações</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {page?.content.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/10 transition-colors group">
                                    <td className="py-4 px-6 text-muted-foreground font-medium">#{user.id}</td>
                                    <td className="py-4 px-6 text-foreground font-bold text-lg">{user.firstName} {user.lastName}</td>
                                    <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.map(role => (
                                                <span key={role.id} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${role.authority === 'ROLE_ADMIN'
                                                    ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                                                    : 'bg-green-500/10 text-green-600 border border-green-500/20'
                                                    }`}>
                                                    {role.authority.replace('ROLE_', '')}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    {hasRole(['ROLE_ADMIN']) && (
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <Link to={`/admin/users/${user.id}`} className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted hover:border-primary/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(user.id)} className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-destructive/20 text-destructive/80 hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
                {page ? (
                    <Pagination
                        pageCount={page.totalPages}
                        range={3}
                        onChange={setActivePage}
                        forcePage={activePage}
                    />
                ) : null}
            </div>

        </div>
    );
}
