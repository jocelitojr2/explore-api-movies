# RocketMovies

Desafio da [RocketSeat](https://rocketseat.com.br) focado em criação de API.

## Stack utilizada

**Back-end:** NodeJS, Express
, Knex, sqLite, bcryptjs

## Instalação Necessárias

Execute o NPM Install

```bash
  npm install
```

Inicie o SERVER

```bash
  npm run dev
```

Execute a Migrations

```bash
  npm run migrate
```

## Documentação da API

### Users (Usuários)

#### Cria um usuário ↓

```http
  POST localhost:3333/users
```

- Body

```JSON
  {
    "name": "teste",
    "email": "teste@gmail.com",
    "password": "****"
  }
```

| Parâmetro  | Tipo     | Descrição        |
| :--------- | :------- | :--------------- |
| `name`     | `string` | **Obrigatório**. |
| `email`    | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |

#### Atualiza um usuário ↓

```http
  PUT localhost:3333/users/${user_id}
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `user_id` | `string` | **Obrigatório**. O ID do usuário |

- Body

```JSON
  {
    "name": "teste",
    "email": "teste@gmail.com",
    "old_password": "123",
    "password": "123"
  }
```

- **Pelo menos 1 das informações devem sem preenchidas**

| Parâmetro      | Tipo     | Descrição                                                       |
| :------------- | :------- | :-------------------------------------------------------------- |
| `name`         | `string` | _Não Obrigatório_.                                              |
| `email`        | `string` | _Não Obrigatório_.                                              |
| `password`     | `string` | _Não Obrigatório_.                                              |
| `old_password` | `string` | **Obrigatório**. torna-se Obrigatório caso for trocar de senha. |

### Movies (Filmes)

#### Retorna um filme pelo ID↓

```http
  GET localhost:3333/movies/${id}
```

| Parâmetro | Tipo     | Descrição                      |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do Filme |

#### Retorna um filme pelo ID do usuário/Titulo/Tags↓

```http
  GET localhost:3333/movies?user_id=1&title=Exemplo&tags=acao
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `user_id` | `string` | **Obrigatório**. O ID do usuário |
| `title`   | `string` | _Não Obrigatório_.               |
| `tags`    | `string` | _Não Obrigatório_.               |

#### Cria um filme↓

```http
  POST localhost:3333/movies/${user_id}
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `user_id` | `string` | **Obrigatório**. O ID do usuário |

- Body

```JSON
  {
    "title": "Teste",
    "description": "Esse é uma filme de exemplo.",
    "rating": "5",
    "tags": ["acao", "+17"],
  }
```

| Parâmetro     | Tipo      | Descrição          |
| :------------ | :-------- | :----------------- |
| `title`       | `string`  | **Obrigatório**.   |
| `description` | `string`  | **Obrigatório**.   |
| `rating`      | `number`  | _Não Obrigatório_. |
| `tags`        | `Array[]` | _Não Obrigatório_. |

#### Deleta um filme↓

```http
  DEL localhost:3333/movies/${movie_id}
```

| Parâmetro  | Tipo     | Descrição                       |
| :--------- | :------- | :------------------------------ |
| `movie_id` | `string` | **Obrigatório**. O ID do filme. |
