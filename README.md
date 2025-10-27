# kevinagyeman-v3

A full-stack project combining a Django backend with an Astro + React frontend.  
This repository contains instructions for setup, development, best practices, and project structure.

---

## Prerequisites

- Python 3.10+
- Node.js 20+
- npm or pnpm
- PostgreSQL (recommended)
- Docker & Docker Compose (optional, for containerized development)

---

## Quick Installation

### 1. Clone the repository

git clone https://github.com/your-username/kevinagyeman-v3.git
cd kevinagyeman-v3

text

---

## Backend Startup (Django)

### 1. Set up the virtual environment

python3 -m venv .venv
source .venv/bin/activate

text

### 2. Install Python dependencies

pip install -r backend/requirements.txt

text

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory with these keys:

SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/yourdbname
ALLOWED_HOSTS=localhost,127.0.0.1

text

Edit the values to fit your local setup.

### 4. Run migrations & start the API

cd backend
python manage.py migrate
python manage.py runserver

text

The API will be available at `http://localhost:8000`.

---

## Frontend Startup (Astro/React)

### 1. Install JS dependencies

cd frontend
npm install

text

### 2. Set up environment variables

Create a `.env` file inside `frontend/` with at least:

API_BASE_URL=http://localhost:8000/api

text

### 3. Run the development server

npm run dev

text

The frontend will run at `http://localhost:3000`.

---

## Docker Startup (optional)

If Docker and Docker Compose are installed, run:

docker-compose up --build

text

To customize, edit the `docker-compose.yml` file or the Dockerfiles inside each respective directory.

---

## Project Structure

kevinagyeman-v3/
backend/
manage.py
app/
requirements.txt
...
frontend/
src/
package.json
...
docker-compose.yml
README.md

text

---

## Useful Commands

- Activate Python virtualenv:  
  `source .venv/bin/activate`
- Install backend dependencies:  
  `pip install -r requirements.txt`
- Install frontend dependencies:  
  `npm install`
- Run migrations:  
  `python manage.py migrate`
- Start backend dev server:  
  `python manage.py runserver`
- Start frontend dev server:  
  `npm run dev`
- Build & run all with Docker:  
  `docker-compose up --build`

---

## Best Practices

- Always use virtual environments (`.venv`) to isolate Python dependencies.
- Keep secrets and sensitive variables in `.env` files (never commit credentials).
- Commit frequently and write clear, descriptive commit messages.
- Use feature-specific or bugfix branches (e.g., `feature/`, `bugfix/`, `hotfix/`)—never develop directly on `main`.
- Write and update docstrings/comments to help with team collaboration.
- Update documentation whenever you change major workflows or dependencies.
- Use automatic testing (`pytest`, `unittest`) before push or release.
- Keep production configs separated from development configs.
- Use Docker for consistent environments between development and production.

---

## FAQ

**Q: How do I reset the local database?**  
A: Delete the `db.sqlite3` file (if using SQLite) or drop and recreate the schema in PostgreSQL, then rerun migrations.

**Q: How do I add new Python dependencies?**  
A: Install via pip (`pip install package`), then update `requirements.txt` with `pip freeze > requirements.txt`.

**Q: How do I add new JavaScript dependencies?**  
A: Use `npm install package` or `pnpm add package`.

---

## Contribution Guidelines

- **Open an issue** for bugs, feature requests, or questions.
- **Submit a pull request** for new features—please provide a detailed description and follow naming conventions.

---

## License

This project is licensed under the MIT License.  
See the LICENSE file for full details.

---

For further details, please check the project Wiki.