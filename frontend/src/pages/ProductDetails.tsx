import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { requestBackend } from '../util/request';
import type { Product } from '../types/product';
import { usePageTitle } from '../hooks/usePageTitle';

export function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    usePageTitle(product?.name ?? 'Produto');

    useEffect(() => {
        setIsLoading(true);
        requestBackend({ url: `/products/${id}` })
            .then(response => {
                setProduct(response.data);
            })
            .catch(() => {
                setErrorMsg('Erro ao carregar os detalhes do produto.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center items-center min-h-[calc(100vh-5rem)]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (errorMsg || !product) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-5rem)]">
                <p className="text-destructive text-xl font-semibold bg-destructive/10 px-6 py-3 rounded-2xl border border-destructive/20">{errorMsg || 'Produto não encontrado.'}</p>
                <Link to="/catalog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o catálogo
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-5rem)] pb-16">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">

                <Link to="/catalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium mb-8 group transition-colors">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-foreground/20 transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Voltar para o catálogo
                </Link>

                <div className="bg-card shadow-xl shadow-black/5 border border-border/40 rounded-[2rem] p-6 text-2xl md:p-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                        {/* Left: Product Image */}
                        <div className="flex-1 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-full aspect-square border-none rounded-[1.5rem] bg-gradient-to-tr from-muted/30 to-background flex items-center justify-center relative overflow-hidden">
                                {/* Back glow */}
                                <div className="absolute inset-20 bg-white rounded-full opacity-60 blur-3xl"></div>
                                <img
                                    src={product.imgUrl}
                                    alt={product.name}
                                    className="relative z-10 object-contain w-full h-full mix-blend-multiply drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex-1 lg:max-w-lg w-full flex flex-col justify-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-semibold border border-green-500/20">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Em Estoque
                                </div>

                                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight text-balance">
                                    {product.name}
                                </h1>

                                <div className="flex items-baseline gap-2 text-primary pt-2">
                                    <span className="text-2xl font-bold opacity-80 uppercase tracking-tighter">R$</span>
                                    <span className="text-5xl md:text-6xl font-black tracking-tight">{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>

                                <hr className="border-border/60 my-6" />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-foreground">
                                        Descrição do Produto
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
