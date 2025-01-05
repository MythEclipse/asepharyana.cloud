module.exports = {
  apps: [
    {
      name: 'asepharyana.cloud',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        DOTENV_CONFIG_PATH: './.env',
      },
    },
  ],
};
