import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import type { Category } from '../../types/category';
import type { Product } from '../../types/product';
import { toast } from 'sonner';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ProductForm() {
    const { id } = useParams();
    const isEditing = id !== undefined;
    usePageTitle(isEditing ? 'Editar Produto — Admin' : 'Novo Produto — Admin');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imgUrl: '',
        categories: [] as Category[]
    });

    useEffect(() => {
        // Fetch categories for the checkbox list
        requestBackend({ url: '/categories', params: { size: 100 } })
            .then(response => {
                setCategories(response.data.content);
            });
    }, []);

    useEffect(() => {
        if (isEditing) {
            setIsLoading(true);
            requestBackend({ url: `/products/${id}` })
                .then(response => {
                    const product = response.data as Product;
                    setFormData({
                        name: product.name,
                        price: String(product.price),
                        description: product.description,
                        imgUrl: product.imgUrl || '',
                        categories: product.categories,
                    });
                })
                .catch(err => {
                    console.error('Erro ao buscar produto', err);
                    setErrorMsg('Erro ao carregar o produto.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isEditing, id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (val: Category) => {
        setFormData(prev => {
            const hasCat = prev.categories.some(c => c.id === val.id);
            const newCats = hasCat
                ? prev.categories.filter(c => c.id !== val.id)
                : [...prev.categories, val];
            return { ...prev, categories: newCats };
        });
    };

    const hasCategory = (catId: number) => {
        return formData.categories.some(c => c.id === catId);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.categories.length === 0) {
            setErrorMsg('Selecione pelo menos uma categoria.');
            return;
        }

        setIsSaving(true);
        setErrorMsg('');

        const config = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${id}` : '/products',
            data: {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                imgUrl: formData.imgUrl,
                date: new Date().toISOString(), // Defaulting to current date
                categories: formData.categories,
            },
        };

        requestBackend(config)
            .then(() => {
                navigate('/admin/products');
                toast.success('Produto salvo com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao salvar', err);
                setErrorMsg('Ocorreu um erro ao salvar o produto. Verifique os dados.');
                toast.error('Erro ao salvar produto.');
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/products" className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {isEditing ? 'Editar Produto' : 'Novo Produto'}
                </h1>
            </div>

            <div className="bg-card shadow-sm border border-border/60 rounded-[2rem] p-6 text-2xl md:p-10 relative overflow-hidden min-h-[500px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {errorMsg && (
                        <div className="lg:col-span-2 bg-destructive/10 text-destructive text-sm font-semibold p-4 rounded-xl border border-destructive/20 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    {/* Left Column: Input Fields */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Nome do Produto</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: Computador Desktop"
                                className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Preço</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                placeholder="0.00"
                                className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Categorias</label>
                            <div className="grid grid-cols-2 gap-2 text-sm bg-background border border-border/60 rounded-xl p-4 max-h-40 overflow-y-auto">
                                {categories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-muted/50 rounded-lg transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={hasCategory(cat.id)}
                                            onChange={() => handleCategoryChange(cat)}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="font-medium text-foreground">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Descrição</label>
                            <textarea
                                rows={5}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Descreva os detalhes do produto..."
                                className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base resize-none"
                            />
                        </div>
                    </div>

                    {/* Right Column: Image and Submit */}
                    <div className="space-y-6 h-full flex flex-col">
                        <div className="space-y-2 flex-1 flex flex-col">
                            <label className="text-sm font-semibold text-foreground">URL da Imagem</label>
                            <input
                                type="url"
                                name="imgUrl"
                                value={formData.imgUrl}
                                onChange={handleInputChange}
                                required
                                placeholder="http://exemplo.com/imagem.png"
                                className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                            />

                            <div className="flex-1 w-full border-2 border-dashed border-border rounded-3xl bg-muted/20 mt-4 flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '200px' }}>
                                {formData.imgUrl ? (
                                    <div className="relative w-full max-w-[200px] aspect-square rounded-2xl shadow-sm bg-white p-4">
                                        <img src={formData.imgUrl} alt="Preview" className="w-full h-full object-contain mix-blend-multiply"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Invalid_Image_URL'; }} />
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Insira uma URL de imagem válida para pré-visualizar.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 flex-col sm:flex-row">
                            <Link to="/admin/products" className="flex-1 text-center bg-background text-foreground font-semibold border-2 border-border/80 px-8 py-4 rounded-xl hover:bg-muted transition-all active:scale-95 text-base uppercase tracking-wider">
                                Cancelar
                            </Link>
                            <button disabled={isSaving || isLoading} type="submit" className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold border-2 border-primary px-8 py-4 rounded-xl hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all active:scale-95 text-base uppercase tracking-wider disabled:opacity-70 disabled:pointer-events-none">
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar Produto'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
