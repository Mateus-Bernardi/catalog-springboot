# Catalog Spring Boot API

![Java](https://img.shields.io/badge/Java-21-orange.svg) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-brightgreen.svg) ![Spring Security](https://img.shields.io/badge/Spring%20Security-OAuth2%20%2B%20JWT-blue.svg) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-relational_database-blue.svg) ![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)

## Visão Geral

O **Catalog API** é um sistema de back-end robusto, desenvolvido em **Java 21** com **Spring Boot 3**. Ele fornece recursos completos para gerenciamento de um catálogo de produtos, categorias e usuários, com autenticação e autorização via **OAuth2** e **JWT**.

O projeto foi arquitetado seguindo boas práticas de desenvolvimento, garantindo alta coesão, baixo acoplamento, segurança avançada e facilidade de manutenção.

---

## Tecnologias Utilizadas

| Camada | Tecnologias |
|---|---|
| **Linguagem** | Java 21 |
| **Framework** | Spring Boot 3.5.11 |
| **Persistência** | Spring Data JPA, Hibernate |
| **Banco de Dados** | PostgreSQL (Produção/Dev), H2 Database (Testes) |
| **Segurança** | Spring Security, OAuth2 Authorization/Resource Server, JWT |
| **Documentação** | SpringDoc OpenAPI (Swagger UI) |
| **Testes** | JUnit 5, Mockito, Spring Boot Test, Spring Security Test |
| **Infra/Deploy** | Docker (Multi-stage build), Maven, Render |

---

## Modelo de Dados


**Relacionamentos:**
- `Product` ↔ `Category`: **ManyToMany** (tabela `product_category`)
- `User` ↔ `Role`: **ManyToMany** (tabela `user_role`)
- `User` implementa `UserDetails` (Spring Security)
- `Role` implementa `GrantedAuthority` (Spring Security)


## Arquitetura e Estrutura de Pacotes

O projeto adota uma **arquitetura em camadas** (Layers Pattern) para separar responsabilidades:

```
com.mateus.catalog
├── CatalogApplication.java             # Classe principal + @OpenAPIDefinition
├── config/
│   ├── AppConfig.java                  # Bean BCryptPasswordEncoder
│   ├── AuthorizationServerConfig.java  # OAuth2 Authorization Server, JWT, RSA Keys
│   ├── ResourceServerConfig.java       # Resource Server, CORS, SecurityFilterChain
│   └── customgrant/                    # Custom Password Grant Type
│       ├── CustomPasswordAuthenticationConverter.java
│       ├── CustomPasswordAuthenticationProvider.java
│       ├── CustomPasswordAuthenticationToken.java
│       └── CustomUserAuthorities.java
├── controllers/
│   ├── CategoryController.java         # REST endpoints /categories
│   ├── ProductController.java          # REST endpoints /products
│   ├── UserController.java             # REST endpoints /users
│   └── exceptions/
│       ├── ControllerExceptionHandler.java  # @ControllerAdvice global
│       └── StandardError.java               # Payload padrão de erro
├── dto/
│   ├── CategoryDTO.java
│   ├── ProductDTO.java                 # Com validações @NotBlank, @Positive, @Size
│   ├── RoleDTO.java
│   ├── UserDTO.java                    # Com validações @NotBlank, @Email
│   ├── UserInsertDTO.java              # Com @UserInsertValid (email único)
│   └── UserUpdateDTO.java             # Com @UserUpdateValid (email único no update)
├── entities/
│   ├── Category.java                   # @PrePersist/@PreUpdate para timestamps
│   ├── Product.java                    # @ManyToMany com Category
│   ├── Role.java                       # Implements GrantedAuthority
│   └── User.java                       # Implements UserDetails
├── exceptions/
│   ├── DatabaseException.java
│   ├── FieldMessage.java
│   ├── ResourceNotFoundException.java
│   └── ValidationError.java           # Extends StandardError
├── repositories/
│   ├── CategoryRepository.java
│   ├── ProductRepository.java          # Custom JPQL com filtro e JOIN FETCH
│   ├── RoleRepository.java
│   └── UserRepository.java
└── services/
    ├── CategoryService.java
    ├── ProductService.java
    ├── UserService.java                # Implements UserDetailsService
    └── validation/
        ├── UserInsertValid.java        # Custom annotation
        ├── UserInsertValidator.java    # ConstraintValidator (email único)
        ├── UserUpdateValid.java        # Custom annotation
        └── UserUpdateValidator.java   # ConstraintValidator (email único no update)
```

### Boas Práticas Implementadas

- **Tratamento Global de Exceções:** `@ControllerAdvice` com handlers para `ResourceNotFoundException` (404), `DatabaseException` (400) e `MethodArgumentNotValidException` (422)
- **Validação de Dados:** Bean Validation (`@Valid`) + Custom Validators (`UserInsertValidator`, `UserUpdateValidator`) para garantir unicidade de email
- **Paginação e Ordenação:** Todos os endpoints de listagem suportam paginação nativa via `Pageable`
- **Busca com filtros:** Endpoint de produtos permite filtrar por **nome** e **categoria** simultaneamente
- **Prevenção N+1:** Query com `JOIN FETCH` para carregar categorias junto com produtos
- **CORS Configurado:** Origens permitidas via variável de ambiente `CORS_ORIGINS`
- **Open-in-View desabilitado:** `spring.jpa.open-in-view=false` para evitar lazy loading acidental
- **Auditoria:** `@PrePersist`/`@PreUpdate` em `Category` para timestamps automáticos
- **Seed de Dados:** `data.sql` com 25 produtos, 3 categorias, 2 usuários e 2 roles pré-cadastrados

---

## Endpoints da API

### Públicos (sem autenticação)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/products?page=0&size=12&sort=name,asc` | Listar produtos (paginado, com filtros) |
| `GET` | `/products?categoryId=1&name=sofá` | Filtrar por categoria e/ou nome |
| `GET` | `/categories` | Listar categorias (paginado) |
| `GET` | `/categories/{id}` | Buscar categoria por ID |
| `POST` | `/users` | Cadastrar novo usuário (registro) |
| `POST` | `/oauth2/token` | Obter token JWT (autenticação) |


### Protegidos — Apenas ADMIN

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/products` | Criar produto |
| `PUT` | `/products/{id}` | Atualizar produto |
| `DELETE` | `/products/{id}` | Excluir produto |
| `POST` | `/categories` | Criar categoria |
| `PUT` | `/categories/{id}` | Atualizar categoria |
| `DELETE` | `/categories/{id}` | Excluir categoria |
| `GET` | `/users` | Listar usuários |
| `GET` | `/users/{id}` | Buscar usuário por ID |
| `PUT` | `/users/{id}` | Atualizar usuário |
| `DELETE` | `/users/{id}` | Excluir usuário |

---

## Autenticação e Autorização

O projeto implementa um **OAuth2 Authorization Server** com **custom password grant type** e tokens **JWT auto-contidos** (self-contained).

### Obter Token

```bash
curl -X POST http://localhost:8080/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u myclientid:myclientsecret \
  -d "grant_type=password&username=luigi@gmail.com&password=123456"
```

### Claims do JWT

O token JWT inclui as seguintes claims customizadas:

| Claim | Descrição |
|---|---|
| `authorities` | Lista de roles do usuário (ex: `["ROLE_ADMIN", "ROLE_OPERATOR"]`) |
| `username` | Email do usuário |
| `user_id` | ID do usuário no banco |
| `first_name` | Primeiro nome |
| `last_name` | Sobrenome |

### Roles

| Role | Permissões |
|---|---|
| `ROLE_OPERATOR` | Visualizar produto por ID |
| `ROLE_ADMIN` | Acesso total: CRUD de produtos, categorias e usuários |

### Usuários de Teste (Seed)

| Nome | Email | Senha | Roles |
|---|---|---|---|
| Mario Smith | `mario@gmail.com` | `123456` | OPERATOR |
| Luigi Green | `luigi@gmail.com` | `123456` | OPERATOR, ADMIN |


## Como Executar o Projeto

### Pré-requisitos

- Java 21+ instalado
- Maven 3.8+ instalado
- PostgreSQL (opcional, para perfil `dev`)
- Docker (opcional)

### Executando Localmente (Perfil Test — H2)

O perfil `test` usa o banco de dados **H2 em memória**, sem necessidade de configuração externa. Os dados iniciais são carregados automaticamente via `data.sql`.

```bash
# Clone o repositório
git clone https://github.com/Mateus-Bernardi/catalog-springboot.git
cd catalog-springboot/backend

# Execute o projeto
./mvnw spring-boot:run
```

### Executando com PostgreSQL (Perfil Dev)

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

> **Nota:** Configure as credenciais de acesso ao PostgreSQL no `application-dev.properties` ou via variáveis de ambiente.

### Executando via Docker

O projeto possui um **Dockerfile com multi-stage build** que gera uma imagem otimizada baseada em **Alpine JRE** (~200MB), com flags de memória compatíveis com planos gratuitos (ex: Render free tier).

```bash
# Build da imagem
docker build -t catalog-api:latest .

# Rodar o container
docker run -p 8080:8080 --name catalog-api \
  -e SPRING_PROFILES_ACTIVE=dev \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/catalog \
  -e DB_USERNAME=admin \
  -e DB_PASSWORD=sua_senha \
  catalog-api:latest
```


## Documentação da API (Swagger)

Com a aplicação rodando, acesse a documentação interativa:

| Recurso | URL |
|---|---|
| **Swagger UI** | `http://localhost:8080/swagger-ui/index.html` |
| **OpenAPI JSON** | `http://localhost:8080/v3/api-docs` |

---

## Testes

A suíte de testes pode ser executada com:

```bash
./mvnw test
```

### Cobertura de Testes

| Camada | Tipo | Classe de Teste |
|---|---|---|
| **Repository** | `@DataJpaTest` | `ProductRepositoryTests` — save, delete, findById |
| **Service** | Unitário (Mockito) | `ProductServicesTests` — findAll, findById, insert, update, delete, exceções |
| **Service** | Integração (`@SpringBootTest`) | `ProductServicesIntegrationTests` — delete, paginação, ordenação |
| **Controller** | `@WebMvcTest` (MockMvc) | `ProductControllerTests` — CRUD endpoints, payloads, status codes |
| **Controller** | Integração (`@SpringBootTest`) | `ProductControllerIntegrationTests` — ordenação, update |


## Deploy

O projeto está preparado para deploy no **Render** com:

- **Dockerfile otimizado:** Multi-stage build (Maven → Alpine JRE)
- **Flags de memória:** `-Xmx300m -Xss512k` para planos de 512MB RAM
- **Perfil de produção:** `application-prod.properties` com variáveis de ambiente
- **Banco externo:** PostgreSQL configurado via `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`


## Autor

Desenvolvido por **Mateus Bernardi**.

- GitHub: [Mateus-Bernardi](https://github.com/Mateus-Bernardi)