# Banco de Trocas de Conhecimento (API) - Projeto DFS-2026.1 Squad 06

> **Status:** Concluído | **Desafios Opcionais:** 100% Concluídos

## Objetivo do Projeto

Esta aplicação web foi desenvolvida com o objetivo de tornar o processo de troca de habilidades mais acessível e organizado. O sistema permite o cadastro e a visualização de conhecimentos oferecidos por pessoas da comunidade, facilitando a conexão entre quem deseja ensinar e quem quer aprender.

## Tecnologias Utilizadas

O backend foi construído visando performance, segurança e boas práticas de arquitetura:

- **Node.js** com **Express** (Gerenciamento de rotas e servidor)
- **Prisma ORM** (Modelagem e consultas ao banco de dados)
- **PostgreSQL** (Banco de dados relacional hospedado via Neon)
- **JWT (JSON Web Token)** & **Bcrypt.js** (Segurança e Autenticação)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

## Diferenciais (Desafios Opcionais)

Além dos requisitos básicos de CRUD para pessoas e conhecimentos, esta API implementa:

1. **Filtros Avançados:** Busca combinada de ofertas por `categoria`, `nivel` e texto (buscando no `titulo` ou `descricao`).
2. **Autenticação e Permissões:** Sistema seguro onde rotas de criação, edição e exclusão de ofertas são protegidas por Token JWT. Cada pessoa cadastrada só pode editar e excluir as suas próprias ofertas.

---

## Instruções para Executar a Aplicação

Siga os passos abaixo para rodar o projeto localmente na sua máquina.

### 1. Pré-requisitos

- Node.js instalado (versão 18+ recomendada)
- PostgreSQL rodando atráves de um banco em nuvem (Neon)

### 2. Clonando e Instalando

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Wellandradexix100/BackAvanti.git
cd  BackAvanti
npm install

```

### 3. Configurando as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

```env
# URL de conexão com o seu banco de dados PostgreSQL
DATABASE_URL="aqui você coloca a sua string de conexão com o banco"

# Chave secreta para geração dos tokens JWT
JWT_SECRET="sua_chave_secreta_super_segura"

```

### 4. Configurando o Banco de Dados (Prisma)

Execute as migrations para criar as tabelas no seu banco de dados:

```bash
npx prisma migrate dev --name init

```

### 5. Rodando o Servidor

Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev

```

O servidor estará rodando em `http://localhost:3000`.

---

## Documentação das Rotas (Endpoints)

### Autenticação

- `POST /login`: Recebe `email` e `senha`, retorna o Token JWT.

### Pessoas

- `POST /pessoas`: Cria um novo usuário (Requer `nome`, `email`, `telefone`, `descricao`, `senha`, `role`).
- `GET /pessoas`: Lista todos os usuários e suas respectivas ofertas.
- `PUT /pessoas/:id`: (Protegido) Atualiza os dados do usuário.
- `DELETE /pessoas/:id`: (Protegido) Deleta o usuário e todas as suas ofertas vinculadas.

### Conhecimentos (Ofertas)

- `GET /ofertas`: Lista as ofertas. Aceita filtros via Query Params (ex: `?categoria=Tecnologia&nivel=BASICO&busca=node`).
- `POST /ofertas`: (Protegido) Cria uma nova oferta vinculada ao usuário logado.
- `PUT /ofertas/:id`: (Protegido) Atualiza uma oferta (apenas pelo dono).
- `DELETE /ofertas/:id`: (Protegido) Deleta uma oferta (apenas pelo dono).

---

## Equipe

- **Wellington Bezerra de Andrade**
- **Beatriz de Jesus Barbosa**
- **Raiza Kelly da Silva Sousa**

> Projeto desenvolvido para o Bootcamp **Atlântico Avanti**
