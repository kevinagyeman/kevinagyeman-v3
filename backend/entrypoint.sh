#!/bin/sh
set -e

echo "Starting Django application..."

python manage.py migrate --noinput
python manage.py collectstatic --noinput --clear

echo "Starting server..."

exec "$@"
