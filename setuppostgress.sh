#!/bin/bash

# Update sistem
echo "Updating system..."
sudo apt update

# Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Start dan enable PostgreSQL service
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Akses PostgreSQL sebagai user postgres
echo "Configuring PostgreSQL user and database..."

# Buat database 'sosmed' dan atur password untuk user postgres
sudo -u postgres psql <<EOF
ALTER USER postgres PASSWORD 'postgres';
CREATE DATABASE sosmed;
\q
EOF

# Konfigurasi pg_hba.conf agar user postgres menggunakan password autentikasi
PG_HBA_CONF="/etc/postgresql/$(psql -V | grep -oP '[0-9.]+' | head -1)/main/pg_hba.conf"

echo "Configuring pg_hba.conf for password authentication..."
sudo sed -i "/^local.*all.*postgres/s/peer/md5/" "$PG_HBA_CONF"

# Restart PostgreSQL service
echo "Restarting PostgreSQL service to apply changes..."
sudo systemctl restart postgresql

# Output informasi koneksi database
echo "PostgreSQL has been installed and configured."
echo "Database URL: postgresql://postgres:postgres@localhost:5432/sosmed?schema=public"
