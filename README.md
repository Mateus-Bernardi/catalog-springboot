# Spring Catalog

[![Catalog Spring Boot CI](https://github.com/Mateus-Bernardi/catalog-springboot/actions/workflows/prod.yml/badge.svg)](https://github.com/Mateus-Bernardi/catalog-springboot/actions/workflows/prod.yml) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?logo=vercel)](https://catalog-springboot.vercel.app/)

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)](https://openjdk.org/) [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot) [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**Spring Catalog** é uma aplicação full-stack de catálogo de produtos desenvolvida como projeto de aprendizado e portfólio. Combina uma **API REST robusta** em Java/Spring Boot com um **frontend moderno** em React/TypeScript, implementando autenticação JWT, controle de acesso baseado em roles (RBAC), painel administrativo completo e design premium.

> 🔗 **Demo ao vivo:** [catalog-springboot.vercel.app](https://catalog-springboot.vercel.app/)



## Funcionalidades

### Área Pública
- **Landing Page** — Design moderno com gradientes, glassmorphism e animações de entrada
- **Catálogo de Produtos** — Busca em tempo real (debounce), filtro por categoria, ordenação e paginação
- **Detalhes do Produto** — Página individual com imagem, preço (BRL) e descrição
- **Registro e Login** — Criação de conta e autenticação OAuth2 com JWT

### Painel Administrativo
- **CRUD de Produtos** — Listagem com busca, criação com preview de imagem, edição e exclusão
- **CRUD de Categorias** — Gerenciamento completo em tabela com ações inline
- **CRUD de Usuários** *(ADMIN)* — Gerenciamento com atribuição de roles
- **Controle de Acesso** — `ROLE_OPERATOR` acessa produtos/categorias; `ROLE_ADMIN` acessa tudo incluindo usuários

---

## Arquitetura

```
catalog-springboot/
├── backend/          # API REST — Java 21, Spring Boot 3, PostgreSQL
├── frontend/         # SPA — React 19, TypeScript, Tailwind CSS
├── docker-compose.yml
└── .github/workflows/prod.yml   # CI pipeline (GitHub Actions)
```

| Camada | Stack | Deploy |
|---|---|---|
| **Backend** | Java 21, Spring Boot 3.5, Spring Security, OAuth2/JWT, JPA/Hibernate | [Render](https://render.com/) (Docker) |
| **Frontend** | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 3.4, Axios | [Vercel](https://vercel.com/) |
| **Banco de Dados** | PostgreSQL 16 | [Render](https://render.com/) (Managed) |
| **CI/CD** | GitHub Actions — build + testes a cada push na `main` | GitHub |


## Stack Tecnológico

### Backend
| Tecnologia | Finalidade |
|---|---|
| Java 21 + Spring Boot 3.5 | Framework principal |
| Spring Security + OAuth2 | Autenticação e autorização com JWT |
| Spring Data JPA + Hibernate | Persistência e ORM |
| PostgreSQL / H2 | Banco de produção / testes |
| SpringDoc OpenAPI | Documentação Swagger |
| JUnit 5 + Mockito | Testes unitários e de integração |
| Docker (multi-stage build) | Containerização otimizada |

### Frontend
| Tecnologia | Finalidade |
|---|---|
| React 19 + TypeScript 5.9 | UI com tipagem estática |
| Vite 7 | Build tool + HMR |
| React Router 7 | Roteamento client-side |
| Tailwind CSS 3.4 | Estilização utility-first |
| Axios + Interceptors | HTTP client com injeção automática de JWT |
| Sonner | Toasts/notificações |
| Lucide React | Ícones |

---

## Segurança

O projeto implementa um **OAuth2 Authorization Server** com custom password grant type e tokens **JWT auto-contidos**.

- **Interceptor Axios** injeta automaticamente o header `Authorization: Bearer <token>` em todas as requisições
- **Rotas protegidas** via `<PrivateRoute roles={[...]} />` no frontend
- **`@PreAuthorize`** nos endpoints do backend
- **Validação customizada** — Validators para unicidade de email (`UserInsertValidator`, `UserUpdateValidator`)
- **CORS** configurado via variável de ambiente `CORS_ORIGINS`

### Roles

| Role | Permissões |
|---|---|
| `ROLE_OPERATOR` | Visualizar produtos, categorias (área admin) |
| `ROLE_ADMIN` | CRUD completo de produtos, categorias e usuários |

### Usuários de Teste

| Email | Senha | Roles |
|---|---|---|
| `mario@gmail.com` | `123456` | OPERATOR |
| `luigi@gmail.com` | `123456` | OPERATOR, ADMIN |

---

## Como Executar Localmente

### Pré-requisitos
- **Java 21+** e **Maven 3.8+**
- **Node.js 18+**
- **PostgreSQL** (opcional — perfil `test` usa H2 em memória)

### Backend

```bash
# Clone o repositório
git clone https://github.com/Mateus-Bernardi/catalog-springboot.git
cd catalog-springboot/backend

# Execute com perfil test (H2 em memória, sem configuração)
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

Para usar PostgreSQL, execute com o perfil `dev`:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend

```bash
cd catalog-springboot/frontend

# Instale as dependências
npm install

# Inicie o dev server
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Docker (opcional)

O projeto inclui um `docker-compose.yml` com PostgreSQL 16 e pgAdmin:

```bash
docker compose up -d
```


## Variáveis de Ambiente

### Backend
| Variável | Descrição |
|---|---|
| `APP_PROFILE` | Perfil ativo (`test`, `dev`, `prod`) |
| `DB_URL` | URL JDBC do PostgreSQL |
| `DB_USERNAME` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `CORS_ORIGINS` | Origens permitidas (ex: `https://catalog-springboot.vercel.app`) |
| `CLIENT_ID` | Client ID do OAuth2 |
| `CLIENT_SECRET` | Client Secret do OAuth2 |
| `JWT_DURATION` | Duração do token em segundos |

### Frontend
| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_BACKEND_URL` | URL base da API | `http://localhost:8080` |
| `VITE_CLIENT_ID` | Client ID do OAuth2 | `myclientid` |
| `VITE_CLIENT_SECRET` | Client Secret do OAuth2 | `myclientsecret` |

---

## CI/CD

O projeto possui uma pipeline de **Integração Contínua** com GitHub Actions que executa automaticamente a cada push ou pull request na branch `main`:

1. **Checkout** do código
2. **Setup JDK 21** (Temurin) com cache do Maven
3. **Build e testes** (`mvn clean verify`) com perfil `test`



## Deploy

| Componente | Plataforma | Detalhes |
|---|---|---|
| **Backend** | [Render](https://render.com/) | Docker com multi-stage build (Maven → Alpine JRE, ~200MB). Flags de memória `-Xmx300m -Xss512k` |
| **Frontend** | [Vercel](https://vercel.com/) | Build automático via Vite. Root directory: `frontend` |
| **PostgreSQL** | [Render](https://render.com/) | Banco de dados gerenciado |

---

## Documentação da API

Com o backend rodando, acesse a documentação interativa:

| Recurso | URL |
|---|---|
| Swagger UI | `http://localhost:8080/swagger-ui/index.html` |
| OpenAPI JSON | `http://localhost:8080/v3/api-docs` |

---

## Testes

```bash
cd backend
./mvnw test
```

| Camada | Tipo | Cobertura |
|---|---|---|
| Repository | `@DataJpaTest` | save, delete, findById |
| Service | Unitário (Mockito) | findAll, findById, insert, update, delete, exceções |
| Service | Integração | delete, paginação, ordenação |
| Controller | `@WebMvcTest` | CRUD endpoints, payloads, status codes |
| Controller | Integração | ordenação, update |

---

## Autor

Desenvolvido por **Mateus Bernardi** como projeto de aprendizado e portfólio.

