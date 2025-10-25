# Calculadora do Primeiro Milhão - API Backend

Esta é a API backend para a aplicação "Calculadora do Primeiro Milhão". Ela é responsável pela autenticação de usuários, autorização via JWT, e pela persistência (CRUD) das simulações de investimento em um banco de dados PostgreSQL.

##  Features

-   **Autenticação JWT:** Sistema completo de cadastro (`/signup`) e login (`/signin`) com tokens JWT transportados em cookies `HttpOnly` para maior segurança.
-   **Middleware de Autorização:** Rotas protegidas que garantem que apenas usuários autenticados possam acessar e manipular seus próprios dados.
-   **CRUD de Cálculos:** Endpoints para criar, listar e excluir simulações, com cada registro associado ao usuário logado.
-   **Arquitetura em Camadas:** Estrutura organizada seguindo o padrão `Routes -> Controllers -> Services`, garantindo a separação de responsabilidades e facilitando a manutenção e testes.

## Stack Utilizada

-   **Framework:** [Fastify](https://www.fastify.io/) sobre [Node.js](https://nodejs.org/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **Validação:** [Zod](https://zod.dev/)

## 🚀 Como Configurar e Rodar Localmente

Siga as instruções abaixo para configurar e executar a API em seu ambiente de desenvolvimento.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (v18 ou superior)
-   [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO_BACKEND>
cd <NOME_DA_PASTA_BACKEND>
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o arquivo `.env.example` como base.

```bash
cp .env.example .env
```

Preencha o arquivo `.env` com os valores apropriados. Para o desenvolvimento local com Docker, os valores abaixo são os recomendados.

```env
# URL de conexão para o banco de dados PostgreSQL no Docker
DATABASE_URL="postgresql://docker:docker@localhost:5432/sacre_db"

# Chaves secretas para segurança (gere as suas próprias)
JWT_SECRET="YOUR_SUPER_SECRET_KEY"
COOKIE_SECRET="YOUR_COOKIE_SECRET"

# URL do frontend para a configuração do CORS
FRONTEND_URL="http://localhost:3000"
```

### 4. Iniciar o Banco de Dados com Docker

Com o Docker Desktop em execução, inicie o contêiner do PostgreSQL.

```bash
docker-compose up -d
```
Este comando irá baixar a imagem do PostgreSQL (se necessário) e iniciar o banco de dados em segundo plano.

### 5. Aplicar as Migrações do Banco de Dados

Este comando irá criar as tabelas `users` e `calculations` no seu banco de dados Docker.

```bash
npx prisma migrate dev
```

### 6. Iniciar a Aplicação

```bash
npm run dev
```

🎉 A API estará rodando em `http://localhost:3333`.
