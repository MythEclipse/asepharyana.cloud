#!/bin/bash

# Remove the .next directory to clean up old build files
sudo rm -rf ./.next/

# Pull the latest changes from the Git repository
git fetch origin
git pull origin master

# Install any new or updated dependencies using pnpm
pnpm install

# Run the migration scripts (if using a database or similar setup that requires migrations)
pnpm run migrate

# Build the Next.js project for production
pnpm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    # Restart the PM2 process named "asepharyana.cloud" and update the environment variables
    pm2 restart asepharyana.cloud --update-env

    # Execute commit.sh script
    bash commit.sh
else
    echo "Build failed. Skipping commit."
fi
