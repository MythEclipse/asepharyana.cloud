sudo rm -rf ./.next/ &&git pull && pnpm install && npx prisma generate  && npm run build && pm2 restart asepharyana.cloud --update-env
