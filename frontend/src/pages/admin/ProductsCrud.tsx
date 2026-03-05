import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import { Loader2 } from 'lucide-react';
import type { Product } from '../../types/product';
import type { SpringPage } from '../../types/spring';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ProductsCrud() {
    usePageTitle('Produtos — Admin');
    const { hasRole } = useAuth();
    const [page, setPage] = useState<SpringPage<Product>>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
            setActivePage(0);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchValue]);

    const getProducts = useCallback((pageNumber: number, name: string) => {
        setIsLoading(true);
        requestBackend({ url: '/products', params: { page: pageNumber, size: 10, sort: 'name,asc', name } })
            .then(response => {
                setPage(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        getProducts(activePage, debouncedSearch);
    }, [getProducts, activePage, debouncedSearch]);



    const handleDelete = (id: number) => {
        toast('Tem certeza que deseja excluir este produto?', {
            action: {
                label: 'Sim, excluir',
                onClick: () => {
                    requestBackend({ method: 'DELETE', url: `/products/${id}` })
                        .then(() => {
                            getProducts(activePage, debouncedSearch);
                            toast.success('Produto excluído com sucesso.');
                        })
                        .catch(err => {
                            console.error('Erro ao excluir produto', err);
                            toast.error('Erro ao excluir produto.');
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
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {hasRole(['ROLE_ADMIN']) && (
                    <Link to="/admin/products/form" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap tracking-wide flex items-center justify-center">
                        ADICIONAR
                    </Link>
                )}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Pesquisar Produto"
                        className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors focus:bg-background"
                    />
                </div>
            </div>

            {/* Product List */}
            <div className="space-y-4 relative min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10 rounded-xl">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}

                {page?.content.map((product) => (
                    <div key={product.id} className="bg-card shadow-sm border border-border/60 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-all hover:bg-muted/10">

                        {/* Image */}
                        <div className="w-full md:w-32 aspect-[4/3] bg-muted/20 rounded-lg flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                            <img src={product.imgUrl} alt={product.name} className="object-contain w-full h-full mix-blend-multiply" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-1 text-center md:text-left">
                            <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                            <div className="text-primary font-extrabold text-xl">
                                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        {hasRole(['ROLE_ADMIN']) && (
                            <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                                <Link to={`/admin/products/${product.id}`} className="flex-1 md:flex-none px-6 py-2 border border-muted hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary font-semibold uppercase text-sm rounded-lg transition-colors tracking-wider text-center flex items-center justify-center">
                                    Editar
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className="flex-1 md:flex-none px-6 py-2 border border-destructive/20 text-destructive/80 hover:text-destructive hover:bg-destructive/10 font-semibold uppercase text-sm rounded-lg transition-colors tracking-wider">
                                    Excluir
                                </button>
                            </div>
                        )}

                    </div>
                ))}
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
