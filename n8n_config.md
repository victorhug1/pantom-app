# Configuración de LinkedIn Scraper para n8n

## Archivo Python
- **Archivo**: `linkedin_scraper.py`
- **Ubicación**: `/var/www/pantom.net/linkedin_scraper.py`

## Configuración del Execute Command Node en n8n

### 1. Configuración Básica
- **Node Type**: Execute Command
- **Command**: `source /var/www/pantom.net/venv/bin/activate && python /var/www/pantom.net/linkedin_scraper.py`
- **Working Directory**: `/var/www/pantom.net`

### 2. Variables de Entorno (Opcional)
Para usar datos de ejemplo en lugar de búsquedas reales:
- **USE_SAMPLE_DATA**: `true` (para pruebas)
- **USE_SAMPLE_DATA**: `false` (para búsquedas reales)

### 3. Configuración Completa del Node
```json
{
  "command": "source /var/www/pantom.net/venv/bin/activate && python /var/www/pantom.net/linkedin_scraper.py",
  "workingDirectory": "/var/www/pantom.net",
  "environmentVariables": {
    "USE_SAMPLE_DATA": "false"
  }
}
```

## Estructura de Salida JSON

El script devuelve un array de objetos con la siguiente estructura:

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

## Campos Disponibles
- **nombre**: Nombre completo de la persona
- **cargo**: Cargo o posición (keyword usado en la búsqueda)
- **empresa**: Empresa (actualmente vacío, se puede expandir)
- **linkedin_url**: URL del perfil de LinkedIn

## Modo de Uso

### Para Pruebas (Datos de Ejemplo)
```bash
USE_SAMPLE_DATA=true python linkedin_scraper.py
```

### Para Uso Real (Búsquedas en Internet)
```bash
python linkedin_scraper.py
```

## Personalización

### Cambiar Keywords
Editar la variable `KEYWORDS` en el script:
```python
KEYWORDS = ["ceo", "founder", "gerente", "director", "presidente"]
```

### Cambiar Ubicación
Editar la variable `LOCATION` en el script:
```python
LOCATION = "México"  # o cualquier otro país/ciudad
```

## Notas Importantes

1. **Dependencias**: El script requiere `requests` y `beautifulsoup4` instalados en el entorno virtual
2. **Rate Limiting**: Los motores de búsqueda pueden bloquear solicitudes excesivas
3. **Datos de Ejemplo**: Útil para probar la integración con n8n antes de usar búsquedas reales
4. **Formato de Salida**: Siempre devuelve JSON válido para n8n

## Solución de Problemas

### Error de Dependencias
```bash
cd /var/www/pantom.net
source venv/bin/activate
pip install requests beautifulsoup4
```

### Error de Permisos
```bash
chmod +x linkedin_scraper.py
```

### Probar el Script
```bash
source venv/bin/activate
python linkedin_scraper.py
```
