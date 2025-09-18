module.exports = {
  apps: [
    {
      name: "pantom",             // Nombre de tu app en PM2
      script: "npm",              // Usamos npm para arrancar
      args: "start",              // Comando: npm start
      instances: 1,               // Número de instancias (puedes poner "max" si quieres clúster)
      autorestart: true,          // Reinicia si se cae
      watch: false,               // No observes cambios en producción
      max_memory_restart: "500M", // Reinicia si pasa de 500 MB de RAM
      env: {
        NODE_ENV: "production",
        PORT: 3000                // Puerto donde corre Next.js
      },
      error_file: "./logs/pantom-error.log", // Logs de errores
      out_file: "./logs/pantom-out.log",     // Logs de salida
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};