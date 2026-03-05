import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../util/request';
import { toast } from 'sonner';
import { usePageTitle } from '../../hooks/usePageTitle';

export function CategoryForm() {
    const { id } = useParams();
    const isEditing = id !== undefined;
    usePageTitle(isEditing ? 'Editar Categoria — Admin' : 'Nova Categoria — Admin');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isEditing) {
            setIsLoading(true);
            requestBackend({ url: `/categories/${id}` })
                .then(response => {
                    setFormData({ name: response.data.name });
                })
                .catch(err => {
                    console.error('Erro ao buscar categoria', err);
                    setErrorMsg('Erro ao carregar a categoria.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isEditing, id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);
        setErrorMsg('');

        const config = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/categories/${id}` : '/categories',
            data: formData,
        };

        requestBackend(config)
            .then(() => {
                navigate('/admin/categories');
                toast.success('Categoria salva com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao salvar', err);
                setErrorMsg('Ocorreu um erro ao salvar a categoria.');
                toast.error('Erro ao salvar categoria.');
            })
            .finally(() => {
                setIsSaving(false);
            });
    };
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/categories" className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
                </h1>
            </div>

            <div className="bg-card shadow-sm border border-border/60 rounded-[2rem] p-6 md:p-10 max-w-3xl relative min-h-[300px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10 rounded-[2rem]">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {errorMsg && (
                        <div className="bg-destructive/10 text-destructive text-sm font-semibold p-4 rounded-xl border border-destructive/20 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Nome da Categoria</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Computadores"
                            className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:border-border transition-colors text-base"
                        />
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border/40">
                        <Link to="/admin/categories" className="flex-1 flex items-center justify-center bg-background text-foreground font-semibold border-2 border-border/80 px-8 py-4 rounded-xl hover:bg-muted transition-all active:scale-95 text-base uppercase tracking-wider">
                            Cancelar
                        </Link>
                        <button disabled={isSaving || isLoading} type="submit" className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold border-2 border-primary px-8 py-4 rounded-xl hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all active:scale-95 text-base uppercase tracking-wider disabled:opacity-70 disabled:pointer-events-none">
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar Categoria'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
