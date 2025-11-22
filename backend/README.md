# Backend - Django REST API

This is the backend API for the Kevin Agyeman portfolio website, built with Django and Django REST Framework.

## Tech Stack

- **Framework**: Django 5.2.6
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL (psycopg2)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **CORS**: django-cors-headers
- **Storage**: AWS S3 (django-storages, boto3)
- **Server**: Gunicorn
- **API Documentation**: drf-yasg (Swagger/OpenAPI)

## Prerequisites

- Python 3.8 or higher
- PostgreSQL database
- pip (Python package manager)
- AWS S3 bucket (optional, for media storage)

## Getting Started

### 1. Create and Activate Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate

# On Windows:
.venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory with the following configuration:

```env
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000

# JWT Settings (optional - defaults provided)
SIMPLE_JWT_ACCESS_TOKEN_LIFETIME=60
SIMPLE_JWT_REFRESH_TOKEN_LIFETIME=1440

# AWS S3 Configuration (optional)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1

# Email Settings (optional - for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Set Up the Database

```bash
# Run migrations to create database tables
python manage.py migrate

# Create a superuser for admin access
python manage.py createsuperuser
```

### 5. Run the Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## Available Endpoints

- **Admin Panel**: http://localhost:8000/admin
- **API Root**: http://localhost:8000/api/
- **API Documentation**: http://localhost:8000/swagger/ or http://localhost:8000/redoc/

## Common Django Commands

```bash
# Run development server
python manage.py runserver

# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files (for production)
python manage.py collectstatic

# Run Django shell
python manage.py shell

# Run tests
python manage.py test
```

## Project Structure

```
backend/
├── core/              # Main Django project settings
├── project/           # Project management app
├── information/       # Personal information app
├── manage.py          # Django management script
├── requirements.txt   # Python dependencies
├── .env              # Environment variables (create this)
├── .gitignore        # Git ignore rules
└── db.sqlite3        # SQLite database (dev only)
```

## Production Deployment

### Using Gunicorn

```bash
# Install gunicorn (already in requirements.txt)
pip install gunicorn

# Run with gunicorn
gunicorn core.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker

```bash
# Build the Docker image
docker build -t portfolio-backend .

# Run the container
docker run -p 8000:8000 --env-file .env portfolio-backend
```

## Environment Configuration

### Development
- `DEBUG=True`
- SQLite or local PostgreSQL
- Local file storage for media

### Production
- `DEBUG=False`
- PostgreSQL database
- AWS S3 for media storage
- Set proper `ALLOWED_HOSTS`
- Use strong `SECRET_KEY`
- Configure CORS properly

## Troubleshooting

### PostgreSQL Connection Issues
- Ensure PostgreSQL is running: `brew services start postgresql` (macOS)
- Verify database exists: `psql -l`
- Check DATABASE_URL format: `postgresql://user:password@host:port/dbname`

### Migration Issues
```bash
# Reset migrations (use with caution)
python manage.py migrate --fake appname zero
python manage.py migrate appname
```

### Static Files Not Loading
```bash
python manage.py collectstatic --noinput
```

## Contributing

When making changes to models:
1. Make your model changes
2. Run `python manage.py makemigrations`
3. Review the migration file
4. Run `python manage.py migrate`
5. Test your changes

## License

This project is part of the Kevin Agyeman portfolio website.


pip freeze > requirements.txt