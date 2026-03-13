module.exports = {
  apps: [{
    name: 'pantom',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/pantom.net/pantom-app',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
