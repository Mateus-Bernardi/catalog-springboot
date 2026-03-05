import { useEffect } from "react";

const APP_NAME = "Catalog";

/**
 * Hook para definir o título da aba do navegador.
 * Formato: "Título da Página | Catalog"
 * Se nenhum título for passado, usa apenas "Catalog".
 */
export function usePageTitle(pageTitle?: string) {
    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;

        return () => {
            document.title = APP_NAME;
        };
    }, [pageTitle]);
}
