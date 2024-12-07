#!/bin/bash
docker-compose down
# Build the Docker images
docker-compose build

# Start the Docker containers
docker-compose up --build
