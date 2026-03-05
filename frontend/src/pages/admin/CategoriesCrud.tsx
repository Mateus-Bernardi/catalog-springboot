import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import { Loader2, Edit, Trash2, Plus } from 'lucide-react';
import type { Category } from '../../types/category';
import type { SpringPage } from '../../types/spring';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export function CategoriesCrud() {
    const { hasRole } = useAuth();
    const [page, setPage] = useState<SpringPage<Category>>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getCategories = useCallback((pageNumber: number) => {
        setIsLoading(true);
        requestBackend({ url: '/categories', params: { page: pageNumber, size: 10, sort: 'name,asc' } })
            .then(response => {
                setPage(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        getCategories(activePage);
    }, [getCategories, activePage]);

    const handlePageChange = (newPage: number) => {
        setActivePage(newPage);
    };

    const handleDelete = (id: number) => {
        toast('Tem certeza que deseja excluir esta categoria?', {
            action: {
                label: 'Sim, excluir',
                onClick: () => {
                    requestBackend({ method: 'DELETE', url: `/categories/${id}` })
                        .then(() => {
                            getCategories(activePage);
                            toast.success('Categoria excluída com sucesso.');
                        })
                        .catch(err => {
                            console.error('Erro ao excluir categoria', err);
                            toast.error('Erro ao excluir categoria. Ela pode estar vinculada a algum produto.');
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
                    <Link to="/admin/categories/form" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap tracking-wide shadow-sm flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" />
                        ADICIONAR
                    </Link>
                )}
            </div>

            {/* Categories List */}
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
                                <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Nome da Categoria</th>
                                {hasRole(['ROLE_ADMIN']) && (
                                    <th className="py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider text-right">Ações</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {page?.content.map((cat) => (
                                <tr key={cat.id} className="hover:bg-muted/10 transition-colors group">
                                    <td className="py-4 px-6 text-muted-foreground font-medium">#{cat.id}</td>
                                    <td className="py-4 px-6 text-foreground font-bold text-lg">{cat.name}</td>
                                    {hasRole(['ROLE_ADMIN']) && (
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <Link to={`/admin/categories/${cat.id}`} className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted hover:border-primary/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(cat.id)} className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-destructive/20 text-destructive/80 hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all">
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
                        onChange={handlePageChange}
                        forcePage={activePage}
                    />
                ) : null}
            </div>

        </div>
    );
}
