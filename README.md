# devlinks-api

A REST API for a link-in-bio service (think Linktree for developers). Users register, manage their dev/social links, and expose a public profile endpoint.

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** bcrypt password hashing

## Run locally

```bash
git clone https://github.com/paulperrin-stack/devlinks-api
cd devlinks-api
cp .env.example .env
# Add your DATABASE_URL to .env
npm install
npx prisma migrate dev
node index.js
```

## API Endpoints

### Auth

| Method | Path        | Description     |
|--------|-------------|-----------------|
| POST   | /register   | Create account  |
| POST   | /login      | Login           |

### Links

| Method | Path          | Description       |
|--------|---------------|-------------------|
| POST   | /links        | Add a link        |
| PUT    | /links/:id    | Update a link     |
| DELETE | /links/:id    | Delete a link     |

### Profile

| Method | Path                  | Description          |
|--------|-----------------------|----------------------|
| GET    | /profile/:username    | Get public profile   |

## Example requests

**Register**
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"paul","email":"paul@example.com","password":"secret123"}'
```

**Get profile**
```bash
curl http://localhost:3000/profile/paul
```