# LinkedIn Scraper para n8n

Sistema de scraping de perfiles de LinkedIn usando búsquedas en motores de búsqueda, diseñado para integrarse con n8n mediante el Execute Command Node.

## 🚀 Características

- **Búsqueda por keywords**: CEO, Founder, Gerente, Director
- **Filtrado geográfico**: Configurable por país/ciudad
- **Múltiples motores de búsqueda**: DuckDuckGo + Google (fallback)
- **Datos de ejemplo**: Para pruebas sin hacer búsquedas reales
- **Salida JSON**: Compatible con n8n
- **Manejo de errores**: Robustez ante bloqueos y fallos

## 📁 Archivos del Proyecto

- `linkedin_scraper.py` - Script principal de Python
- `n8n_config.md` - Configuración detallada para n8n
- `n8n_example_workflow.json` - Ejemplo de workflow de n8n
- `test_scraper.sh` - Script de prueba
- `README.md` - Este archivo

## 🛠️ Instalación

### 1. Crear entorno virtual
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar dependencias
```bash
pip install requests beautifulsoup4
```

### 3. Verificar instalación
```bash
./test_scraper.sh
```

## 🔧 Configuración para n8n

### Execute Command Node
```bash
Command: source /var/www/pantom.net/venv/bin/activate && python /var/www/pantom.net/linkedin_scraper.py
Working Directory: /var/www/pantom.net
```

### Variables de Entorno
- `USE_SAMPLE_DATA=true` - Para datos de ejemplo
- `USE_SAMPLE_DATA=false` - Para búsquedas reales

## 📊 Estructura de Datos

### Entrada
- **KEYWORDS**: Array de cargos a buscar
- **LOCATION**: Ubicación geográfica

### Salida JSON
```json
[
  {
    "nombre": "Juan Carlos Pérez",
    "cargo": "ceo",
    "empresa": "TechCorp Colombia",
    "linkedin_url": "https://linkedin.com/in/juan-carlos-perez-ceo"
  }
]
```

## 🎯 Casos de Uso

1. **Lead Generation**: Encontrar ejecutivos por industria y ubicación
2. **Networking**: Identificar contactos profesionales
3. **Investigación de Mercado**: Análisis de competencia
4. **Recruitment**: Búsqueda de candidatos

## ⚠️ Consideraciones

### Rate Limiting
- Los motores de búsqueda pueden bloquear solicitudes excesivas
- El script incluye pausas automáticas entre búsquedas
- DuckDuckGo es más permisivo que Google

### Datos de Ejemplo
- Útil para probar la integración con n8n
- No requiere conexión a internet
- Datos realistas para desarrollo

## 🔄 Personalización

### Cambiar Keywords
```python
KEYWORDS = ["ceo", "founder", "gerente", "director", "presidente"]
```

### Cambiar Ubicación
```python
LOCATION = "México"  # o cualquier otro país/ciudad
```

### Agregar Campos
```python
# En la función de procesamiento
"nuevo_campo": "valor"
```

## 🧪 Pruebas

### Datos de Ejemplo
```bash
./test_scraper.sh sample
# o
USE_SAMPLE_DATA=true python linkedin_scraper.py
```

### Búsqueda Real
```bash
./test_scraper.sh real
# o
python linkedin_scraper.py
```

## 📈 Integración con n8n

### Workflow Básico
1. **Execute Command Node** - Ejecuta el scraper
2. **Code Node** - Procesa los datos
3. **If Node** - Verifica resultados
4. **Database Node** - Guarda datos
5. **Email Node** - Envía reportes

### Ejemplo de Procesamiento
```javascript
// En Code Node de n8n
const data = $input.all()[0].json;
const processedData = data.map(item => ({
  ...item,
  timestamp: new Date().toISOString(),
  processed: true
}));
```

## 🚨 Solución de Problemas

### Error de Dependencias
```bash
source venv/bin/activate
pip install requests beautifulsoup4
```

### Error de Permisos
```bash
chmod +x test_scraper.sh
chmod +x linkedin_scraper.py
```

### Bloqueo de Google
- El script automáticamente usa DuckDuckGo como alternativa
- Si ambos fallan, usa datos de ejemplo
- Considerar usar proxies o VPN para uso intensivo

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas:
- Revisa la documentación en `n8n_config.md`
- Ejecuta `./test_scraper.sh` para verificar la instalación
- Verifica que todas las dependencias estén instaladas

---

**Nota**: Este scraper está diseñado para uso ético y responsable. Respeta los términos de servicio de LinkedIn y los motores de búsqueda.
