# devlinks-api

A REST API for a link-in-bio service (think Linktree for developers). Users register, manage their dev/social links, and expose a public profile endpoint.

**Live:** https://devlinks-api-l1fk.onrender.com

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt

## Run locally

```bash
git clone https://github.com/paulperrin-stack/devlinks-api
cd devlinks-api
cp .env.example .env
# Add your DATABASE_URL and JWT_SECRET to .env
npm install
npx prisma migrate dev
npm run dev
```

## API Endpoints

### Auth

| Method | Path      | Description    |
| ------ | --------- | -------------- |
| POST   | /register | Create account |
| POST   | /login    | Login — returns JWT |

### Links

| Method | Path       | Description   |
| ------ | ---------- | ------------- |
| POST   | /links     | Add a link (auth required) |
| PUT    | /links/:id | Update a link (auth required) |
| DELETE | /links/:id | Delete a link (auth required) |

### Profile

| Method | Path               | Description        |
| ------ | ------------------ | ------------------ |
| GET    | /profile/:username | Get public profile |

## Example requests

**Register**
```bash
curl -X POST https://devlinks-api-l1fk.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{"username":"paul","email":"paul@example.com","password":"secret123"}'
```

**Get profile**
```bash
curl https://devlinks-api-l1fk.onrender.com/profile/paul
```