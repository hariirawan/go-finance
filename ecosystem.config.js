module.exports = {
  apps: [
    {
      name: "maujutest.hariirawan.my.id",
      script: "bun",
      args: "start",
      cwd: "/var/www/html/go-finance",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3008,
      },
    },
  ],
};
