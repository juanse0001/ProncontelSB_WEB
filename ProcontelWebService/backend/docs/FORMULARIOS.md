# Módulo de Formularios - Procontel SB

## Descripción
Este módulo maneja el formulario de necesidades en Facturación Electrónica y POS para Procontel SB. Permite a los usuarios enviar información sobre sus necesidades y preferencias, y a los administradores gestionar estos formularios.

## Estructura del Proyecto

```
backend/
├── models/
│   └── Formulario.js              # Modelo de datos con validaciones
├── controllers/
│   └── formularioController.js    # Controladores con lógica CRUD
├── routes/
│   └── formularioRoutes.js        # Rutas con documentación Swagger
├── services/
│   └── formularioService.js       # Lógica de negocio y servicios
└── ejemplos/
    └── formulario-ejemplo.json    # Ejemplos de uso
```

## Campos del Formulario

### Sección 1: Información Básica
- **nombreCompleto** (requerido): Nombre completo del usuario
- **nombreNegocio** (requerido): Nombre del negocio o tienda
- **numeroContacto** (requerido): Número de contacto/WhatsApp
- **correoElectronico** (requerido): Correo electrónico
- **ubicacion** (requerido): Ciudad/municipio de ubicación

### Sección 2: Intereses y Uso Actual
- **usaFacturacionElectronica**: Si actualmente usa facturación electrónica
- **tieneSistemaPOS**: Si tiene sistema POS
- **valorasEnFacturacion**: Lo que más valora (máximo 2 opciones)

### Sección 3: Opinión sobre Procontel SB
- **atractivoServicio**: Lo que le parece más atractivo del servicio
- **mejoraSugerida**: Sugerencia de mejora (respuesta abierta)
- **beneficioAdicional**: Beneficio adicional que le gustaría recibir

### Sección 4: Decisión y Contacto
- **nivelInteres**: Nivel de interés en adquirir el sistema
- **preferenciaContacto**: Preferencia de contacto

### Metadatos
- **fechaEnvio**: Fecha de envío del formulario
- **estado**: Estado del formulario (nuevo, en_revision, contactado, prospecto_calificado, no_interesado)
- **notas**: Notas adicionales del administrador
- **fechaUltimaActualizacion**: Fecha de última actualización

## Endpoints Disponibles

### Públicos (No requieren autenticación)
- `POST /api/formularios` - Crear un nuevo formulario

### Privados (Requieren autenticación Bearer token)
- `GET /api/formularios` - Obtener todos los formularios con filtros
- `GET /api/formularios/:id` - Obtener formulario por ID
- `PUT /api/formularios/:id` - Actualizar formulario
- `PATCH /api/formularios/:id/estado` - Actualizar estado del formulario
- `DELETE /api/formularios/:id` - Eliminar formulario
- `GET /api/formularios/estadisticas` - Obtener estadísticas

## Validaciones Implementadas

### Validaciones de Campo
- **nombreCompleto**: 2-100 caracteres
- **nombreNegocio**: 2-100 caracteres
- **numeroContacto**: Formato de número válido
- **correoElectronico**: Formato de email válido
- **ubicacion**: 2-100 caracteres
- **valorasEnFacturacion**: 1-2 opciones válidas
- **mejoraSugerida**: 10-500 caracteres
- **notas**: Máximo 1000 caracteres

### Validaciones de Negocio
- No permitir múltiples formularios del mismo email en 24 horas
- Validar opciones seleccionadas contra valores permitidos
- Verificar formato de número de contacto

## Estados del Formulario

1. **nuevo**: Formulario recién enviado
2. **en_revision**: Formulario siendo revisado por el equipo
3. **contactado**: Cliente ya fue contactado
4. **prospecto_calificado**: Cliente calificado como prospecto
5. **no_interesado**: Cliente no está interesado

## Filtros Disponibles

### Filtros de Búsqueda
- **estado**: Filtrar por estado del formulario
- **nivelInteres**: Filtrar por nivel de interés
- **fechaDesde/fechaHasta**: Filtrar por rango de fechas
- **busqueda**: Búsqueda por texto en nombre, negocio, email, ubicación

### Ordenamiento
- **sortBy**: Campo para ordenar (fechaEnvio, nombreCompleto, etc.)
- **sortOrder**: Orden ascendente o descendente

## Estadísticas Disponibles

- Total de formularios
- Formularios por estado
- Formularios por nivel de interés
- Formularios por preferencia de contacto
- Formularios por mes

## Notificaciones por Email

### Email al Administrador
- Notificación inmediata cuando se envía un formulario
- Incluye toda la información del formulario
- Formato HTML con datos estructurados

### Email de Confirmación al Usuario
- Confirmación de recepción del formulario
- Información sobre próximos pasos
- Datos de contacto de Procontel SB

## Documentación Swagger

La documentación completa de la API está disponible en:
- **Desarrollo**: `http://localhost:7000/api-docs`
- **Producción**: `https://tu-dominio.com/api-docs`

## Ejemplo de Uso

### Crear Formulario
```bash
curl -X POST http://localhost:7000/api/formularios \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "Juan Pérez",
    "nombreNegocio": "Tienda El Sol",
    "numeroContacto": "+573001234567",
    "correoElectronico": "juan@tiendaelsol.com",
    "ubicacion": "Bogotá",
    "usaFacturacionElectronica": "No",
    "tieneSistemaPOS": "No, pero me interesa",
    "valorasEnFacturacion": ["Facilidad de uso", "Precio competitivo"],
    "atractivoServicio": "Facturación ilimitada",
    "mejoraSugerida": "Me gustaría que sea más intuitivo",
    "beneficioAdicional": "Capacitación gratuita",
    "nivelInteres": "Muy interesado",
    "preferenciaContacto": "WhatsApp"
  }'
```

### Obtener Formularios (Admin)
```bash
curl -X GET "http://localhost:7000/api/formularios?page=1&limit=10&estado=nuevo" \
  -H "Authorization: Bearer tu-token-jwt"
```

### Actualizar Estado
```bash
curl -X PATCH http://localhost:7000/api/formularios/ID_DEL_FORMULARIO/estado \
  -H "Authorization: Bearer tu-token-jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "contactado",
    "notas": "Cliente contactado exitosamente"
  }'
```

## Consideraciones de Seguridad

- Endpoints públicos solo permiten crear formularios
- Endpoints de administración requieren autenticación JWT
- Validación de entrada en todos los endpoints
- Sanitización de datos antes de guardar
- Rate limiting para prevenir spam

## Mantenimiento

### Índices de Base de Datos
- Email (para búsquedas rápidas)
- Estado (para filtros)
- Fecha de envío (para ordenamiento)
- Nivel de interés (para análisis)

### Limpieza de Datos
- Los formularios se mantienen indefinidamente
- Considerar implementar archivado automático después de 2 años
- Backup regular de datos importantes

## Monitoreo

- Logs de creación de formularios
- Alertas por errores de validación
- Métricas de conversión por estado
- Análisis de tendencias por ubicación e interés
