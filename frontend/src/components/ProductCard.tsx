import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

export function ProductCard({ id, name, price, imgUrl }: ProductCardProps) {
    return (
        <Link to={`/products/${id}`} className="block group h-full">
            <div className="bg-card h-full rounded-[1.25rem] shadow-sm border border-border/60 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-square p-6 bg-gradient-to-b from-muted/30 to-background flex items-center justify-center overflow-hidden">
                    {/* Subtle background circle */}
                    <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white rounded-full opacity-50 blur-2xl"></div>
                    <img
                        src={imgUrl}
                        alt={name}
                        className="relative z-10 object-contain w-full h-full mix-blend-multiply drop-shadow-md"
                    />
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col flex-1 border-t border-border/40 bg-card">
                    <h3 className="font-semibold text-foreground text-lg leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors flex-1 text-balance">
                        {name}
                    </h3>
                    <div className="flex items-baseline gap-1.5 text-primary mt-auto">
                        <span className="text-sm font-bold text-muted-foreground uppercase opacity-80">R$</span>
                        <span className="text-2xl font-extrabold tracking-tight">{price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
