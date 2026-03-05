import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImg from '../assets/hero-image.png';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
    const { authenticated, hasRole } = useAuth();
    return (
        <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-gradient-to-br from-primary/40 via-blue-400/20 to-transparent blur-[100px] rounded-[100%] pointer-events-none -mr-[20%]"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-20 bg-gradient-to-tl from-indigo-500/30 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container relative mx-auto px-4 py-12 md:py-24 z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    <div className="flex-1 space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left animate-in slide-in-from-bottom-8 duration-1000 fill-mode-both">


                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                                Conheça o melhor <br className="hidden xl:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">catálogo de produtos</span>
                            </h1>

                            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
                                Ajudaremos você a encontrar os melhores produtos disponíveis no mercado, com uma experiência fluida e intuitiva.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/catalog"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] active:scale-95 text-lg"
                            >
                                Inicie sua busca
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {authenticated ? (
                                hasRole(['ROLE_ADMIN']) ? (
                                    <Link
                                        to="/admin"
                                        className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-semibold border-2 border-border px-8 py-4 rounded-full hover:bg-muted hover:border-muted-foreground/30 transition-all active:scale-95 text-lg"
                                    >
                                        Painel Admin
                                    </Link>
                                ) : (null
                                )
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-semibold border-2 border-border px-8 py-4 rounded-full hover:bg-muted hover:border-muted-foreground/30 transition-all active:scale-95 text-lg"
                                >
                                    Fazer Login
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-4 opacity-70">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium">Junte-se a mais de <strong className="text-foreground">2,000</strong> usuários</p>
                        </div>

                    </div>

                    <div className="flex-1 w-full max-w-2xl lg:max-w-none relative animate-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] rotate-3 scale-105 transition-transform duration-700 hover:rotate-6"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] -rotate-3 scale-100 backdrop-blur-3xl border border-white/10"></div>

                        <div className="relative p-8 flex items-center justify-center z-10">
                            <img
                                src={heroImg}
                                alt="Hero illustration"
                                className="object-contain w-full h-auto drop-shadow-2xl z-10 mix-blend-multiply"
                            />
                        </div>



                    </div>

                </div>
            </div>
        </div>
    );
}
