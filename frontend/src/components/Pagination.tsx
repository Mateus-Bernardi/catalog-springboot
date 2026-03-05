import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    pageCount: number;
    range: number;
    onChange?: (pageNumber: number) => void;
    forcePage?: number;
};

export function Pagination({ pageCount, range, onChange, forcePage = 0 }: Props) {

    // Calculates which page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(0, forcePage - range);
        const end = Math.min(pageCount - 1, forcePage + range);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (pageCount <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
            {/* Previous Button */}
            <button
                onClick={() => onChange?.(forcePage - 1)}
                disabled={forcePage === 0}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${forcePage === 0
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted active:scale-95 shadow-sm border border-border/40'
                    }`}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map(page => (
                <button
                    key={page}
                    onClick={() => onChange?.(page)}
                    className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${forcePage === page
                        ? 'bg-primary text-primary-foreground shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95'
                        }`}
                >
                    {page + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onChange?.(forcePage + 1)}
                disabled={forcePage === pageCount - 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${forcePage === pageCount - 1
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted active:scale-95 shadow-sm border border-border/40'
                    }`}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
