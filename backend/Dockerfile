# ---- Build Stage ----
FROM python:3.11-slim AS builder

WORKDIR /app

# Installa dipendenze di sistema (es. psycopg2)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copia requirements
COPY requirements.txt ./

# Installa i pacchetti Python nel build container
RUN pip install --upgrade pip && pip install --user -r requirements.txt

# Copia tutto il codice dell'app dall'host al container
COPY . .

# ---- Runtime Stage ----
FROM python:3.11-slim AS runtime

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY --from=builder /app /app

ENV PATH=/root/.local/bin:$PATH

# Variabili d'ambiente base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# Comando avvio. Sostituisci "core" con il nome della tua cartella Django principale se diverso!
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=3"]
