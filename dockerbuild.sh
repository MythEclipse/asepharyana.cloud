#!/bin/bash

# Build the Docker images
docker-compose build

# Start the Docker containers
docker-compose up -d