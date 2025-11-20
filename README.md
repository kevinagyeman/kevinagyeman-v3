# Kevin Agyeman - Portfolio Website

A modern, full-stack personal portfolio website showcasing projects, skills, and professional experience. Built with performance, accessibility, and maintainability in mind.

🌐 **Live Site**: [www.kevinagyeman.com](https://www.kevinagyeman.com)

## ✨ Features

- **Dynamic Project Showcase** - Display projects with detailed descriptions, tech stacks, and live links
- **Admin Dashboard** - Full-featured CMS for managing content without code changes
- **Interactive Code Viewer** - Visualize profile data in multiple programming languages
- **Responsive Design** - Optimized for all devices with Tailwind CSS
- **Dark Mode** - Automatic theme switching with user preference persistence
- **PDF Resume Viewer** - Embedded resume with fallback support
- **Contact Form** - Easy way for visitors to get in touch
- **CDN Fallback** - Automatic local fallbacks when CDN is blocked
- **Type-Safe** - Full TypeScript + Zod validation for reliability
- **SEO Optimized** - Built-in sitemap generation and meta tags

## 🛠️ Tech Stack

### Frontend
- **Framework**: Astro 5.x (Static Site Generation)
- **UI Library**: React 19 (Islands Architecture)
- **Styling**: Tailwind CSS 4.x
- **Forms**: React Hook Form + Zod validation
- **Code Quality**: Biome (Linting & Formatting)
- **Deployment**: Vercel

### Backend
- **Framework**: Django 5.x + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT with httpOnly cookies
- **Media Storage**: CDN integration
- **API**: RESTful endpoints with CORS support

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

## 📁 Project Structure

```
kevinagyeman-v3/
├── backend/                 # Django REST API
│   ├── manage.py
│   ├── project/            # Django project settings
│   ├── information/        # Personal info API
│   ├── auth/              # Authentication endpoints
│   └── requirements.txt
├── frontend/               # Astro + React frontend
│   ├── src/
│   │   ├── components/    # React & Astro components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Route pages
│   │   ├── schemas/       # Zod validation schemas
│   │   ├── services/      # API service layer
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   ├── package.json
│   └── biome.json        # Linter configuration
├── docker-compose.yml
└── README.md
```

---

## 🏗️ Architecture

This project follows a **decoupled architecture** with a clear separation between frontend and backend:

- **Frontend (Astro + React)**: Statically generated pages with React islands for interactivity
- **Backend (Django REST API)**: Provides RESTful endpoints for content management
- **Authentication**: JWT tokens stored in httpOnly cookies for security
- **Media Handling**: CDN for images/files with automatic local fallbacks
- **Deployment**: Frontend on Vercel, Backend on your preferred platform

### Key Design Decisions

- **Islands Architecture**: Only interactive components are hydrated (better performance)
- **Type Safety**: TypeScript + Zod ensure runtime validation
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Performance**: Lazy loading, code splitting, optimized assets

---

## 💎 Code Quality

This project maintains high code quality standards:

✅ **A+ Grade** - Comprehensive error handling
✅ **Type Safe** - Full TypeScript with Zod validation
✅ **No Memory Leaks** - Proper cleanup in useEffect hooks
✅ **Secure** - No XSS vulnerabilities, proper authentication
✅ **Accessible** - WCAG compliant with ARIA support
✅ **Tested** - React best practices followed throughout

### Frontend Best Practices
- Error boundaries for graceful failure handling
- Loading states for all async operations
- Proper React hooks usage with correct dependencies
- setTimeout/setInterval cleanup to prevent memory leaks
- Unique stable keys for list items

### Backend Best Practices
- Django REST Framework for API consistency
- Proper CORS configuration
- JWT authentication with secure cookies
- Database migrations for schema management

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

## 🤝 Contributing

While this is a personal portfolio project, feedback and suggestions are welcome!

- **Report bugs** - Open an issue with detailed reproduction steps
- **Suggest features** - Share ideas for improvements
- **Code quality** - PRs welcome for bug fixes (please follow existing patterns)

Please ensure:
- Code follows Biome linting rules (`npm run check:fix`)
- TypeScript types are properly defined
- Error handling is implemented
- No console.log statements in production code

---

## 📝 License

This project is for personal use and portfolio demonstration.
Feel free to use the code structure as inspiration for your own projects.

---

## 👤 Author

**Kevin Agyeman**
- Website: [www.kevinagyeman.com](https://www.kevinagyeman.com)
- GitHub: [@kevinagyeman](https://github.com/kevinagyeman)
- LinkedIn: [kevinagyeman](https://www.linkedin.com/in/kevinagyeman/)

---

## ⭐ Acknowledgments

Built with love using modern web technologies. Special thanks to the open-source community for the amazing tools and libraries that made this project possible.

If you find this project helpful or interesting, please consider giving it a star! ⭐