# Spring Catalog — Frontend

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Frontend moderno do **Spring Catalog**, uma aplicação completa de catálogo de produtos com área pública, autenticação JWT, painel administrativo com CRUD completo e controle de acesso baseado em roles (RBAC). Desenvolvido com foco em performance, tipagem estática e design premium.

## Funcionalidades Principais

### Área Pública
*   **Home** — Landing page com design moderno, gradientes e animações de entrada.
*   **Catálogo** — Listagem de produtos com **busca em tempo real** (debounce de 500ms), **filtro por categoria**, **ordenação** (nome A-Z/Z-A, preço ↑/↓) e paginação.
*   **Detalhes do Produto** — Página individual com imagem, preço formatado (BRL), descrição e categorias.
*   **Registro** — Página de criação de conta com validação de confirmação de senha.
*   **Login** — Autenticação OAuth2 (Resource Owner Password Credentials) com redirecionamento inteligente pós-login baseado no role do usuário.

### Painel Administrativo (`/admin`)
*   **CRUD de Produtos** — Listagem paginada com busca, criação, edição (com preview de imagem) e exclusão com confirmação via toast.
*   **CRUD de Categorias** — Gerenciamento completo em formato de tabela com ações inline.
*   **CRUD de Usuários** *(apenas ROLE_ADMIN)* — Gerenciamento de usuários com atribuição de roles.
*   **Layout com Sidebar** — Navegação lateral persistente com `<Outlet />` do React Router.

---

## Segurança e Controle de Acesso (RBAC)

*   **Autenticação JWT** — Implementada de ponta a ponta com `jwt-decode` para decodificação e verificação de expiração do token.
*   **Interceptors do Axios** — `interceptors.request` em `util/request.ts` anexa automaticamente o header `Authorization: Bearer <token>` em todas as chamadas à API, exceto na rota `/oauth2/token`.
*   **Context API** — `AuthContext` gerencia o estado global de autenticação, expondo `loginContext()`, `logoutContext()` e `hasRole()`.
*   **Rotas Protegidas (RBAC)** — Componente `<PrivateRoute roles={[...]} />` protege a árvore de rotas:
    *   `/admin/*` — Acessível por `ROLE_ADMIN` e `ROLE_OPERATOR`.
    *   `/admin/users/*` — Acessível **apenas** por `ROLE_ADMIN` (dupla camada de proteção).
*   **Redirecionamento condicional** — Pós-login: admins vão para `/admin`, operadores vão para `/catalog`.


## Interface Visual (UI/UX)

*   **Design Tokens** — Sistema de cores via CSS Custom Properties com suporte completo a **Light e Dark mode**.
*   **Tipografia** — Fonte [Inter](https://rsms.me/inter/) importada via `@fontsource` com pesos 400, 500, 600 e 700.
*   **Glassmorphism** — Navbar com `backdrop-blur-md`, cards com `backdrop-blur-xl` e fundos semi-transparentes.
*   **Gradientes e efeitos** — Background glows, sombras dinâmicas, hover effects e transições suaves.
*   **Animações** — Entradas animadas (`animate-in`, `slide-in-from-bottom`) via `tailwindcss-animate`, e micro-interações (`active:scale-95`, `group-hover`).
*   **Toasts** — Notificações modernas e customizadas com [Sonner](https://sonner.emilkowal.ski/) para feedback de sucesso, erro e confirmação de exclusão.
*   **Loading States** — Spinners (`Loader2 animate-spin`) e desabilitação de botões durante submissões.
*   **Títulos Dinâmicos** — Hook `usePageTitle()` atualiza o `<title>` da aba do navegador dinamicamente em todas as páginas.



## Estrutura de Pastas

```
src/
├── assets/           # Imagens estáticas (hero, ilustrações, mock)
├── components/       # Componentes reutilizáveis de UI
│   ├── layout/       # Navbar
│   ├── Pagination.tsx
│   ├── PrivateRoute.tsx
│   └── ProductCard.tsx
├── contexts/         # Estado global via Context API
│   └── AuthContext.tsx
├── hooks/            # Hooks customizados
│   └── usePageTitle.ts
├── lib/              # Funções utilitárias (cn / classnames)
│   └── utils.ts
├── pages/            # Componentes em nível de página
│   ├── admin/        # Painel administrativo
│   │   ├── AdminLayout.tsx
│   │   ├── ProductsCrud.tsx / ProductForm.tsx
│   │   ├── CategoriesCrud.tsx / CategoryForm.tsx
│   │   └── UsersCrud.tsx / UserForm.tsx
│   ├── Home.tsx
│   ├── Catalog.tsx
│   ├── ProductDetails.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── types/            # Interfaces e tipos TypeScript
│   ├── category.ts / product.ts / user.ts / role.ts
│   └── spring.ts     # SpringPage<T> (paginação genérica)
├── util/             # Módulos utilitários
│   ├── auth.ts       # Decodificação JWT + verificação de expiração
│   ├── request.ts    # Instância Axios com interceptors
│   ├── storage.ts    # Abstração do localStorage
│   └── system.ts     # Variáveis de ambiente (BASE_URL, OAuth2)
├── App.tsx           # Definição de rotas e providers
├── main.tsx          # Ponto de entrada
└── index.css         # Design tokens (light/dark) + Tailwind directives
```


## Rotas da Aplicação

| Rota | Página | Acesso |
|---|---|---|
| `/` | Home (Landing Page) | 🌐 Público |
| `/catalog` | Catálogo de Produtos | 🌐 Público |
| `/products/:id` | Detalhes do Produto | 🌐 Público |
| `/login` | Login | 🌐 Público |
| `/register` | Registro de Conta | 🌐 Público |
| `/admin` | Painel Admin (redireciona para `/admin/products`) | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/products` | CRUD de Produtos | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/products/form` | Formulário — Novo Produto | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/products/:id` | Formulário — Editar Produto | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/categories` | CRUD de Categorias | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/categories/form` | Formulário — Nova Categoria | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/categories/:id` | Formulário — Editar Categoria | 🔒 `ROLE_ADMIN` / `ROLE_OPERATOR` |
| `/admin/users` | CRUD de Usuários | 🔐 `ROLE_ADMIN` apenas |
| `/admin/users/form` | Formulário — Novo Usuário | 🔐 `ROLE_ADMIN` apenas |
| `/admin/users/:id` | Formulário — Editar Usuário | 🔐 `ROLE_ADMIN` apenas |
| `*` | Fallback → Redireciona para `/` | 🌐 Público |


## Tecnologias e Stack

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | 19 | Biblioteca principal de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Tipagem estática |
| [Vite](https://vitejs.dev/) | 7 | Build tool + HMR |
| [React Router](https://reactrouter.com/) | 7 | Roteamento client-side |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Framework CSS utility-first |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | 1.0 | Animações de entrada/saída |
| [Axios](https://axios-http.com/) | 1.13 | Cliente HTTP com interceptors |
| [Sonner](https://sonner.emilkowal.ski/) | 2.0 | Sistema de toasts/notificações |
| [Lucide React](https://lucide.dev/) | 0.577 | Biblioteca de ícones |
| [JWT-Decode](https://github.com/auth0/jwt-decode) | 4.0 | Decodificação de tokens JWT |
| [Inter (Fontsource)](https://fontsource.org/fonts/inter) | 5.2 | Tipografia moderna |
| [ESLint](https://eslint.org/) | 9 | Linting e análise estática |



## Instalação e Execução

### Pré-requisitos
*   [Node.js](https://nodejs.org/) v18+ ou v20+ (recomendado).
*   Backend Spring Boot configurado e rodando (URL base padrão: `http://localhost:8080`).

### Passos

1.  Navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

A aplicação rodará em **http://localhost:5173** com Hot Module Replacement (HMR).



## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend (ou configure diretamente no seu serviço de deploy):

| Variável | Descrição | Valor Padrão |
|---|---|---|
| `VITE_BACKEND_URL` | URL base da API backend | `http://localhost:8080` |
| `VITE_CLIENT_ID` | Client ID do OAuth2 | `myclientid` |
| `VITE_CLIENT_SECRET` | Client Secret do OAuth2 | `myclientsecret` |

Exemplo de `.env`:
```env
VITE_BACKEND_URL=https://sua-api.onrender.com
VITE_CLIENT_ID=myclientid
VITE_CLIENT_SECRET=myclientsecret
```


## 📌 Possíveis Melhorias Futuras

1.  **React Query / TanStack Query** — Substituir `useEffect` + `useState` por caching robusto, deduplicação de requests e validação proativa.
2.  **React Hook Form + Zod** — Abstrair o estado de formulários com validação de schemas, eliminando a duplicação de lógicas como `handleInputChange`.
3.  **Hook `useDebounce`** — Extrair o padrão de debounce repetido em `Catalog.tsx` e `ProductsCrud.tsx` para um hook reutilizável.
4.  **Componentes de Input reutilizáveis** — Criar `<Input>`, `<Select>`, `<Textarea>` para eliminar repetição de classes CSS nos formulários.
5.  **Menu mobile funcional** — O botão hamburger da Navbar está decorativo; implementar toggle com menu dropdown.
6.  **Testes Automatizados** — Inclusão de `Vitest` com `Testing Library` para testar hooks, utilitários e regras críticas de UI.
