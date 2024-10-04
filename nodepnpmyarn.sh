#!/bin/bash

# Set NVM_DIR ke lokasi yang benar
export NVM_DIR="/usr/local/share/nvm"
echo "NVM_DIR set to $NVM_DIR"

# Load NVM
if [ -s "$NVM_DIR/nvm.sh" ]; then
  echo "Loading NVM..."
  . "$NVM_DIR/nvm.sh"
  
  # Instal Node.js versi terbaru
  echo "Installing Node.js..."
  nvm install node

  # Instal Yarn secara global
  echo "Installing Yarn globally..."
  npm install -g yarn

  # Instal PNPM secara global
  echo "Installing PNPM globally..."
  npm install -g pnpm

  # Instal dependensi menggunakan PNPM
  echo "Installing dependencies with PNPM..."
  pnpm install
else
  echo "nvm.sh not found in $NVM_DIR"
fi
