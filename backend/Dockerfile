# ---- Build Stage ----
FROM python:3.11-slim AS builder

WORKDIR /app

# Installa dipendenze di sistema necessarie (compilazione psycopg2)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copia requirements
COPY requirements.txt ./

# Installa dipendenze Python nel build container
RUN pip install --upgrade pip && pip install --user -r requirements.txt

# Copia tutto il codice dall’host al container
COPY . .

# ---- Runtime Stage ----
FROM python:3.11-slim AS runtime

WORKDIR /app

# Installa libreria client PostgreSQL necessaria durante runtime
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

# Copia le dipendenze Python dalla fase build
COPY --from=builder /root/.local /root/.local

# Copia il codice dalla fase build
COPY --from=builder /app /app

ENV PATH=/root/.local/bin:$PATH

# Variabili d’ambiente Python/Django
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Rendi eseguibile e copia entrypoint (script per migrazioni + collectstatic)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Esponi la porta 8000 (default Gunicorn)
EXPOSE 8000

# Comando default per avviare il server Gunicorn Django
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=3"]
