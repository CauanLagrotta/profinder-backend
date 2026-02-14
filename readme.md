# ProFinder Documentation

## Para rodar o projeto:

Exemplo de como deve estar o .env:
```sh
NODE_ENV="dev"
PORT=3333
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
JWT_SECRET=your_jwt_secret_key_here
```

-> Instale as dependências
```bash
npm install
```

-> Rode o container
```bash
docker compose up -d 
```

-> Rode o projeto
```bash
npm run dev
```

## Para rodar as migrations:

-> Gere as migrations
```bash
npx drizzle-kit generate
```

-> Rodar as migrations para criar as tabelas
```bash
npx drizzle-kit migrate
```

-> Rode o seed
```bash
npm run seed
```

## API Documentation (English)

Base URL: `http://localhost:3333`

Authentication:
- Protected routes require `Authorization: Bearer <token>`.
- Tokens are issued by `/auth/signup` and `/auth/signin`.

### Health
`GET /ping`

Response `200`
```json
{ "message": "pong" }
```

### Auth
`POST /auth/signup`

Request body
```json
{
  "name": "Jane Doe",
  "email": "jane@mail.com",
  "password": "secret123",
  "ddd": "11",
  "phone": "999990000",
  "bio": "Optional bio"
}
```

Response `201`
```json
{
  "message": "User created",
  "token": "<jwt>",
  "user": {
    "name": "Jane Doe",
    "email": "jane@mail.com",
    "ddd": "11",
    "phone": "999990000",
    "bio": "Optional bio"
  }
}
```

Errors
- `409` when email already exists.
- `400` when validation fails (Zod error format).

`POST /auth/signin`

Request body
```json
{
  "email": "jane@mail.com",
  "password": "secret123"
}
```

Response `200`
```json
{
  "message": "Login realizado com sucesso!",
  "token": "<jwt>",
  "user": {
    "name": "Jane Doe",
    "email": "jane@mail.com"
  }
}
```

Notes
- Also sets a `token` cookie (`httpOnly`, `sameSite=strict`).

Errors
- `401` when credentials are invalid.
- `400` when validation fails (Zod error format).

### Users
`GET /user/:id`

Response `200`
```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "email": "jane@mail.com",
  "avatar": "https://...",
  "ddd": "11",
  "phone": "999990000",
  "bio": "Optional bio",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z",
  "rating": 4,
  "locationId": "uuid"
}
```

Errors
- `404` when user is not found.

`GET /user/:id/posts`

Response `200`
```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "Post title",
      "description": "Post description",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z",
      "categoryId": "uuid",
      "images": [{ "url": "https://..." }]
    }
  ]
}
```

Notes
- Returns an empty array when the user has no posts.

`PUT /user/:id/update` (protected)

Request body (all fields optional)
```json
{
  "name": "New name",
  "ddd": "11",
  "phone": "999990000",
  "bio": "New bio",
  "avatarUrl": "https://..."
}
```

Response `200`
```json
{
  "user": {
    "name": "New name",
    "avatarUrl": "https://...",
    "ddd": "11",
    "phone": "999990000",
    "bio": "New bio",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

Errors
- `400` when validation fails.
- `401` when missing/invalid token.
- `500` when the user does not exist (service throws).

`DELETE /user/:id/delete` (protected)

Response `200`
```json
{ "message": "Usuário deletado com sucesso" }
```

Errors
- `400` when the id is missing.
- `401` when missing/invalid token.
- `500` on delete failure.

### Posts
`POST /post/` (protected)

Status
- Not implemented yet (controller and service are empty).
