# Documentación de la Base de Datos

## Estructura

### Colección: leads

La colección `leads` es la principal colección para el seguimiento de contactos y leads.

#### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | String | Nombre del lead (requerido) |
| email | String | Email del lead (requerido, único) |
| telefono | String | Teléfono del lead (opcional) |
| fuente | String | Origen del lead (web, newsletter, contacto, referido, otro) |
| segmento | String | Nivel del lead (frio, tibio, caliente) |
| etiquetas | Array | Etiquetas para categorización |
| pasosDelFunnel | Array | Historial de interacciones |
| ultimaInteraccion | Object | Última interacción del lead |
| estado | String | Estado del lead (activo, inactivo, convertido) |
| metadata | Object | Metadatos adicionales |
| fechaRegistro | Date | Fecha de registro |
| fechaActualizacion | Date | Fecha de última actualización |

#### Índices

| Nombre | Campos | Tipo | Descripción |
|--------|--------|------|-------------|
| email_unique | email | Único | Previene duplicados de email |
| segmento_index | segmento | Normal | Optimiza búsquedas por segmento |
| fecha_registro_index | fechaRegistro | Normal | Optimiza búsquedas por fecha |
| segmento_estado_fecha_index | segmento, estado, fechaRegistro | Compuesto | Optimiza búsquedas comunes |

### Colección: logs

La colección `logs` almacena los logs de la aplicación.

#### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| timestamp | Date | Fecha y hora del log |
| level | String | Nivel del log (error, warn, info, debug) |
| message | String | Mensaje del log |
| data | Object | Datos adicionales |
| createdAt | Date | Fecha de creación |

## Inicialización

La base de datos se inicializa automáticamente al arrancar la aplicación. El proceso incluye:

1. Verificación de conexión a MongoDB
2. Creación de índices necesarios
3. Creación de colecciones requeridas

## Migración de Datos

Para migrar datos existentes a la nueva estructura:

1. Los suscriptores del newsletter se migran como leads fríos
2. Los contactos se migran como leads tibios
3. Se mantiene un registro de la migración en los metadatos

## Uso

### Crear un nuevo lead

```javascript
import { createOrUpdateLead } from '../lib/leadService';

const lead = await createOrUpdateLead({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  fuente: 'web',
  etiquetas: ['nuevo']
});
```

### Actualizar segmento

```javascript
import { updateLeadSegment } from '../lib/leadService';

const lead = await updateLeadSegment('juan@example.com', 'tibio', {
  razon: 'interesado_en_servicios'
});
```

## Mantenimiento

### Verificar estado

```bash
curl http://localhost:3000/api/ping
```

### Verificar índices

```javascript
import { checkIndexes } from '../lib/initDb';

const indexesOk = await checkIndexes();
```

## Consideraciones

1. Los emails son únicos en la colección leads
2. Los leads se actualizan automáticamente si el email ya existe
3. Se mantiene un historial de todas las interacciones
4. Los logs de error se guardan en MongoDB 