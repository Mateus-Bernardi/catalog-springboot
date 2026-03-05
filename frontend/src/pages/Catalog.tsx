import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../util/request';
import type { SpringPage } from '../types/spring';
import type { Product } from '../types/product';
import type { Category } from '../types/category';
import { Pagination } from '../components/Pagination';

export function Catalog() {
    const [page, setPage] = useState<SpringPage<Product>>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortParam, setSortParam] = useState('name,asc');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState('0');

    useEffect(() => {
        requestBackend({ url: '/categories', params: { size: 100 } })
            .then(response => {
                setCategories(response.data.content);
            });
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
            setActivePage(0); // Reset pagination on search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchValue]);

    const getProducts = useCallback((pageNumber: number, name: string, sortStr: string, catId: string) => {
        setIsLoading(true);
        requestBackend({ url: '/products', params: { page: pageNumber, size: 12, sort: sortStr, name, categoryId: catId } })
            .then(response => {
                setPage(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        getProducts(activePage, debouncedSearch, sortParam, categoryId);
    }, [getProducts, activePage, debouncedSearch, sortParam, categoryId]);

    const handlePageChange = (newPage: number) => {
        setActivePage(newPage);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 relative min-h-[calc(100vh-5rem)]">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-10 bg-primary/40 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Header Area */}
            <div className="mb-10 text-center md:text-left space-y-2 relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    Catálogo Explorer
                </h1>
                <p className="text-muted-foreground text-lg">
                    Descubra os melhores equipamentos para o seu setup.
                </p>
            </div>

            {/* Search Bar & Filters */}
            <div className="bg-card/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 mb-12 relative z-10">

                <div className="flex-1 relative w-full group">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="O que você está procurando?"
                        className="w-full bg-background border border-border/60 hover:border-border rounded-xl py-3.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base placeholder:text-muted-foreground"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-105 transition-transform cursor-pointer">
                        <Search className="w-4 h-4" />
                    </div>
                </div>

                <div className="w-full md:w-auto flex items-center gap-3">
                    <div className="relative w-full md:w-56">
                        <select
                            value={categoryId}
                            onChange={(e) => {
                                setCategoryId(e.target.value);
                                setActivePage(0);
                            }}
                            className="w-full bg-background border border-border/60 rounded-xl py-3.5 pl-5 pr-11 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer transition-all text-foreground truncate"
                        >
                            <option value="0">Todas as Categorias</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>

                    <div className="relative w-full md:w-56">
                        <select
                            value={sortParam}
                            onChange={(e) => {
                                setSortParam(e.target.value);
                                setActivePage(0);
                            }}
                            className="w-full bg-background border border-border/60 rounded-xl py-3.5 pl-5 pr-11 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer transition-all font-medium text-foreground truncate"
                        >
                            <option value="name,asc">Ordem Alfabética (A-Z)</option>
                            <option value="name,desc">Ordem Alfabética (Z-A)</option>
                            <option value="price,asc">Menor Preço</option>
                            <option value="price,desc">Maior Preço</option>
                        </select>
                        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>

                    <button
                        onClick={() => {
                            setSearchValue('');
                            setSortParam('name,asc');
                            setCategoryId('0');
                            setActivePage(0);
                        }}
                        className="flex-shrink-0 px-6 py-3.5 rounded-xl border border-border/60 hover:bg-muted hover:border-border font-medium transition-all text-muted-foreground hover:text-foreground whitespace-nowrap hidden md:block"
                    >
                        Limpar Filtros
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 gap-y-10 mb-16 relative z-10">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    page?.content.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imgUrl={product.imgUrl}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pb-8 relative z-10">
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
