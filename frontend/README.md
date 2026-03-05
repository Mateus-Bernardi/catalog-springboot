# DS Catalog - Frontend

Este é o projeto frontend do **DS Catalog**, uma aplicação moderna de catálogo de produtos desenvolvida com as mais recentes tecnologias do ecossistema React. A aplicação foca em fornecer uma interface de usuário de alta qualidade, responsiva e com excelente performance, além de um painel administrativo seguro e robusto.

## Tecnologias e Stack Utilizado

O projeto foi construído sobre uma base sólida, priorizando tipagem estática, componentização e estilização utilitária.

*   **[React 19](https://react.dev/)**: Biblioteca principal para a construção das interfaces, utilizando os mais recentes hooks e padrões de componentes funcionais.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, garantindo maior segurança e previsibilidade do código.
*   **[Vite](https://vitejs.dev/)**: Build tool de nova geração, garantindo um ambiente de desenvolvimento (HMR) extremamente rápido e builds otimizados.
*   **[React Router v7](https://reactrouter.com/)**: Gerenciamento de rotas da aplicação (Client-side routing).
*   **[Tailwind CSS v3](https://tailwindcss.com/)**: Framework CSS utilitário (Utility-first) para estilização rápida, responsiva e customizável.
*   **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises, configurado de forma avançada com interceptors.
*   **[Sonner](https://sonner.emilkowal.ski/)**: Sistema moderno e polido de notificações (Toasts).
*   **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones belos e consistentes.
*   **[JWT-Decode](https://github.com/auth0/jwt-decode)**: Decodificação de tokens JWT no frontend para controle de sessão e permissões.

## Características e Boas Práticas Implementadas


### 1. Arquitetura e Organização (Separation of Concerns)
A estrutura de pastas em `src/` está altamente organizada e semântica:
*   `/components`: Componentes reutilizáveis (UI) da aplicação (ex: `ProductCard`, `Pagination`).
*   `/contexts`: Gerenciamento de estado global com a Context API (ex: `AuthContext`).
*   `/hooks`: Hooks customizados isolando lógica de negócio (ex: `usePageTitle`).
*   `/pages`: Componentes em nível de página, agrupando as diferentes visões e dividindo a área pública da área restrita (`/admin`).
*   `/types`: Definições globais de interfaces e tipos do TypeScript (`Product`, `Category`, `User`, `Role`), garantindo forte tipagem no fluxo de dados.
*   `/util`: Funções utilitárias e abstrações isoladas em módulos (ex: `auth.ts`, `storage.ts`, `request.ts`).

### 2. Segurança e Controle de Acesso (RBAC)
*   **Autenticação JWT:** Implementada de ponta a ponta.
*   **Interceptors do Axios:** Utilização inteligente de `interceptors.request` em `util/request.ts` para anexar automaticamente o cabeçalho `Authorization: Bearer <token>` em todas as chamadas à API, exceto em rotas específicas como o login (OAuth2).
*   **Role-Based Access Control (RBAC):** Uso estratégico de uma abstração de `<PrivateRoute roles={['ROLE_ADMIN']} />` envolvendo diretamente a árvore do `React Router`. Essa abordagem impede proativamente que usuários não autorizados ou com o perfil incorreto (ex: `ROLE_OPERATOR` tentando acessar recursos de `ROLE_ADMIN`) acessem rotas críticas.

### 3. Interface Visual Moderna (UI/UX)
*   Visual altamente responsivo (Mobile-First approach via Tailwind).
*   Uso de padrões modernos de design: Glassmorphism, Gradientes suaves com desfoque de fundo, Sombras dinâmicas e Efeitos de Hover interativos.
*   As interações do usuário são imediatamente respondidas utilizando a biblioteca `Sonner` em pontos chave de sucesso e erro (como persistência em telas de formulário).
*   Animações de fluidez na transição e renderização de componentes com a biblioteca complementar `tailwindcss-animate`.

### 4. Integração de API Fluida
*   Estados de `Loading` e desabilitação apropriada de botões durante submissões de formulário (`<Loader2 animate-spin />`).
*   Uso constante do bloco `try/catch/finally` (ou chains `.then().catch().finally()`) para garantir uma UI consistente sempre, independente do resultado da requisição.

## Instalação e Execução (Desenvolvimento)

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (versão compatível com as features das dependências atuais, sugerida v18+ ou v20+).
*   Backend Java/Spring boot configurado e rodando (a URL base padrão consumida localmente fica em `http://localhost:8080`, expansível via configuração em `src/util/system.ts`).

### Passos

1. Clone o repositório ou navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências usando NPM:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```

A aplicação deverá rodar por padrão em http://localhost:5173 e atualizará instantaneamente o navegador caso alguma mudança no código (HMR) seja realizada.


## Possíveis Melhorias Futuras
Embora a base do projeto esteja excelente, algumas opções e melhorias escaláveis para o futuro conforme a aplicação cresce:
1.  **React Query / SWR**: Trocar fluxos simples de `useEffect` por `TanStack Query` para caching robusto, deduplicação de requests e validação proativa do lado do cliente.
2.  **React Hook Form + Zod**: Abstrair o estado de formulários gigantes de dentro dos componentes usando `React Hook Form` combinado com a biblioteca `zod` para validação robusta de esquemas (schema validation).
3.  **Testes Automatizados**: Inclusão do framework `Vitest` com `Testing Library` para testar os Custom Hooks, funções Utilitárias puro JavaScript/TypeScript (`storage.ts` e `auth.ts`) e Regras críticas de UI.

