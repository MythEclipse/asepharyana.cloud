rm -rf /root/asepharyana.my.id/.next/ &&git pull && pnpm install && npx prisma generate  && npm run build && pm2 restart asepharyana.my.id --update-env
