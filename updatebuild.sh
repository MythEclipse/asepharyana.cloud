# Remove the .next directory to clean up old build files
sudo rm -rf ./.next/ 

# Pull the latest changes from the Git repository
git pull 

# Install any new or updated dependencies using pnpm
pnpm install 

# Run the migration scripts (if using a database or similar setup that requires migrations)
pnpm run migrate  

# Build the Next.js project for production
npm run build 

# Restart the PM2 process named "asepharyana.cloud" and update the environment variables
pm2 restart asepharyana.cloud --update-env 

# Execute commit.sh script (you may want to verify if it's necessary or if it requires any specific permissions)
bash commit.sh
