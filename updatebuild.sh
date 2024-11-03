sudo rm -rf ./.next/ && git pull && pnpm install && pnpm run migrate  && npm run build && pm2 restart asepharyana.cloud --update-env
bash commit.sh
