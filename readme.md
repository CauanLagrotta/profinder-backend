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