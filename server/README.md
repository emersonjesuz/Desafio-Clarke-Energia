# Desafio Clarke com NestJS e GraphQL

Projeto desenvolvido como parte de um desafio proposto pela Clarke Energia.

## Pré-requisitos

- Docker
- Docker Compose
- Node.js - versão LTS ou superior (opção sem uso do docker)

## Configuração do Ambiente

O projeto utiliza variáveis de ambiente para configurar informações sensíveis. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias, como o exemplo abaixo ou copie do rquivo `exemple.env`:

```bash
PG_USER=my_user
PG_PASSWORD=my_password
PG_DATABASE=my_database

DATABASE_URL="postgresql://${PG_USER}:${PG_PASSWORD}@db:5432/${PG_DATABASE}?schema=public"
```

`Nota: Ajuste os valores das variáveis conforme necessário para o seu ambiente de desenvolvimento.`

## Instalação

- Clone o repositório para sua máquina local:

```bash
$ git clone https://github.com/emersonjesuz/Desafio-Clarke-Energia.git
```

- Acesse o diretório do projeto:

```bash
$ cd .\server\
```

- Instale as dependências do projeto:

```bash
$ npm install
```

## Rodando o Projeto com Docker

### Configuração do Docker

O projeto inclui um arquivo `docker-compose.yml` que configura o ambiente de desenvolvimento com Docker.

Para rodar o projeto, execute o comando abaixo:

```bash
$ npm run docker:up
```

Isso criará e iniciará os containers definidos no docker-compose.yml, incluindo o container do NestJS e, se configurado, do banco de dados (PostgreSQL).

### Parando o Projeto

Para parar e remover os containers:

```bash
$ npm run docker:down
```

### Rodando o Projeto (Sem Docker)

- Após instalar as dependências, você pode rodar o projeto localmente utilizando o seguinte comando:

```bash
$ npm start
```

O projeto será aberto no navegador padrão no endereço http://localhost:3005.

### Usando a API GraphQL

inicie o projeto e navegue até:

```bash
$ http://localhost:3000/graphql
```

#### Exemplo de Query

Aqui está um exemplo de consulta GraphQL para buscar todos os itens:

```bash
query {
  items {
    id
    name
    description
  }
}
```

#### Exemplo de Mutation

Aqui está um exemplo de mutação para criar um novo item:

```bash
mutation {
  createItem(input: { name: "Novo Item", description: "Descrição do item" }) {
    id
    name
    description
  }
}
```

## Rodando os Testes com Jest

Para rodar todos os testes:

```bash
$ npm run test
```

### Tecnologias Utilizadas

- NestJS
- GraphQL
- Docker
- Jest
- PostgreSQL
