# Little Bubble Preschool

Lightweight preschool website — **React + Vite + Tailwind** frontend, **FastAPI (Python)** backend, **Postgres** database, all via **Docker Compose**.

## Features
- Public pages: Home, About, Programs, Gallery, News, Contact (enrollment inquiry form).
- Admin dashboard (`/admin`): manage news posts, upload gallery images, track inquiries.
- JWT-based admin auth (seeded from `.env`).

## Quick start

```bash
cp .env.example .env         # then edit secrets: JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
docker compose up --build
```

Once everything is up:

- Public site: http://localhost:5173
- API docs (Swagger): http://localhost:8000/docs
- Admin login: http://localhost:5173/admin/login — use `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

Postgres persists in the `pgdata` Docker volume; uploaded gallery images persist in the `uploads` volume.

## Project layout

```
little-bubble/
├── docker-compose.yml
├── .env.example
├── backend/        # FastAPI + SQLAlchemy + Alembic
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic/
│   └── app/
│       ├── main.py
│       ├── config.py, database.py, models.py, schemas.py, auth.py, deps.py, seed.py
│       └── routers/  (auth, news, gallery, inquiries)
└── frontend/       # React + Vite + Tailwind
    ├── Dockerfile
    ├── package.json, vite.config.ts, tailwind.config.js
    └── src/
        ├── App.tsx, main.tsx
        ├── api/client.ts, auth/AuthContext.tsx
        ├── components/  (Navbar, Footer, ProtectedRoute)
        └── pages/       (public + admin)
```

## Common tasks

- **Stop everything**: `docker compose down` (add `-v` to wipe data).
- **Tail logs**: `docker compose logs -f backend` (or `frontend`, `db`).
- **Shell into backend**: `docker compose exec backend bash`.
- **psql**: `docker compose exec db psql -U $POSTGRES_USER -d $POSTGRES_DB`.
- **Create a new migration** (after editing `app/models.py`):
  `docker compose exec backend alembic revision --autogenerate -m "your message"`
  then `docker compose exec backend alembic upgrade head`.

## Notes

- The Vite dev server proxies `/api` and `/uploads` to the backend container, so the React app uses relative URLs — no CORS gymnastics needed in dev.
- The seed script is idempotent: the admin user is only created if it doesn't already exist, so restarts don't overwrite a changed password.
# preschool
