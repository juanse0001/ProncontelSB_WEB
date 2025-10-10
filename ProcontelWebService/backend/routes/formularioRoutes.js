const express = require('express');
const router = express.Router();
const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
  actualizarEstadoFormulario,
  obtenerEstadisticas
} = require('../controllers/formularioController');
const { protectAdminRoute } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Formulario:
 *       type: object
 *       required:
 *         - nombreCompleto
 *         - nombreNegocio
 *         - numeroContacto
 *         - correoElectronico
 *         - ubicacion
 *         - usaFacturacionElectronica
 *         - tieneSistemaPOS
 *         - valorasEnFacturacion
 *         - atractivoServicio
 *         - mejoraSugerida
 *         - beneficioAdicional
 *         - nivelInteres
 *         - preferenciaContacto
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del formulario
 *         nombreCompleto:
 *           type: string
 *           description: Nombre completo del usuario
 *           minLength: 2
 *           maxLength: 100
 *         nombreNegocio:
 *           type: string
 *           description: Nombre del negocio o tienda
 *           minLength: 2
 *           maxLength: 100
 *         numeroContacto:
 *           type: string
 *           description: Número de contacto/WhatsApp
 *           pattern: '^[\+]?[1-9][\d]{0,15}$'
 *         correoElectronico:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         ubicacion:
 *           type: string
 *           description: Ciudad/municipio de ubicación
 *           minLength: 2
 *           maxLength: 100
 *         usaFacturacionElectronica:
 *           type: string
 *           enum: ['Sí', 'No', 'Estoy en proceso de implementarlo']
 *           description: Si actualmente usa facturación electrónica
 *         tieneSistemaPOS:
 *           type: string
 *           enum: ['Sí, ya tengo uno', 'No, pero me interesa', 'No lo necesito por ahora']
 *           description: Si tiene sistema POS
 *         valorasEnFacturacion:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Facilidad de uso', 'Precio competitivo', 'Soporte al cliente', 'Reportes e informes', 'Integración con otros sistemas']
 *           minItems: 1
 *           maxItems: 2
 *           description: Lo que más valora en un sistema de facturación (máximo 2 opciones)
 *         atractivoServicio:
 *           type: string
 *           enum: ['Facturación ilimitada', 'Manejo de inventarios', 'Reportes con gráficas', 'Integración con otros sistemas', 'Asesoría personalizada']
 *           description: Lo que le parece más atractivo del servicio
 *         mejoraSugerida:
 *           type: string
 *           description: Sugerencia de mejora para software de facturación
 *           minLength: 10
 *           maxLength: 500
 *         beneficioAdicional:
 *           type: string
 *           enum: ['Descuentos por pago anual', 'Capacitación gratuita', 'Integraciones sin costo', 'Soporte premium']
 *           description: Beneficio adicional que le gustaría recibir
 *         nivelInteres:
 *           type: string
 *           enum: ['Muy interesado', 'Interesado', 'Poco interesado']
 *           description: Nivel de interés en adquirir el sistema
 *         preferenciaContacto:
 *           type: string
 *           enum: ['WhatsApp', 'Llamada telefónica', 'Correo electrónico']
 *           description: Preferencia de contacto
 *         fechaEnvio:
 *           type: string
 *           format: date-time
 *           description: Fecha de envío del formulario
 *         estado:
 *           type: string
 *           enum: ['nuevo', 'en_revision', 'contactado', 'prospecto_calificado', 'no_interesado']
 *           default: 'nuevo'
 *           description: Estado del formulario
 *         notas:
 *           type: string
 *           maxLength: 1000
 *           description: Notas adicionales del administrador
 *         fechaUltimaActualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última modificación
 *     
 *     FormularioResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Formulario'
 *     
 *     FormulariosResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Formulario'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: number
 *             totalPages:
 *               type: number
 *             totalItems:
 *               type: number
 *             itemsPerPage:
 *               type: number
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *     
 *     EstadisticasResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             totalFormularios:
 *               type: number
 *             formulariosPorEstado:
 *               type: object
 *             formulariosPorNivelInteres:
 *               type: object
 *             formulariosPorPreferenciaContacto:
 *               type: object
 */

/**
 * @swagger
 * /api/formularios:
 *   post:
 *     summary: Crear un nuevo formulario
 *     description: Endpoint público para que los usuarios envíen el formulario de necesidades
 *     tags: [Formularios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Formulario'
 *           example:
 *             nombreCompleto: "Juan Pérez"
 *             nombreNegocio: "Tienda El Sol"
 *             numeroContacto: "+573001234567"
 *             correoElectronico: "juan@tiendaelsol.com"
 *             ubicacion: "Bogotá"
 *             usaFacturacionElectronica: "No"
 *             tieneSistemaPOS: "No, pero me interesa"
 *             valorasEnFacturacion: ["Facilidad de uso", "Precio competitivo"]
 *             atractivoServicio: "Facturación ilimitada"
 *             mejoraSugerida: "Me gustaría que sea más intuitivo y fácil de usar"
 *             beneficioAdicional: "Capacitación gratuita"
 *             nivelInteres: "Muy interesado"
 *             preferenciaContacto: "WhatsApp"
 *     responses:
 *       201:
 *         description: Formulario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormularioResponse'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', crearFormulario);

/**
 * @swagger
 * /api/formularios:
 *   get:
 *     summary: Obtener todos los formularios
 *     description: Endpoint para administradores para obtener todos los formularios con filtros y paginación
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de elementos por página
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [nuevo, en_revision, contactado, prospecto_calificado, no_interesado]
 *         description: Filtrar por estado
 *       - in: query
 *         name: nivelInteres
 *         schema:
 *           type: string
 *           enum: [Muy interesado, Interesado, Poco interesado]
 *         description: Filtrar por nivel de interés
 *       - in: query
 *         name: fechaDesde
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar desde fecha (YYYY-MM-DD)
 *       - in: query
 *         name: fechaHasta
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar hasta fecha (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: fechaEnvio
 *         description: Campo para ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de clasificación
 *     responses:
 *       200:
 *         description: Lista de formularios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormulariosResponse'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', protectAdminRoute, obtenerFormularios);

/**
 * @swagger
 * /api/formularios/estadisticas:
 *   get:
 *     summary: Obtener estadísticas de formularios
 *     description: Endpoint para administradores para obtener estadísticas generales de los formularios
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadisticasResponse'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/estadisticas', protectAdminRoute, obtenerEstadisticas);

/**
 * @swagger
 * /api/formularios/{id}:
 *   get:
 *     summary: Obtener formulario por ID
 *     description: Endpoint para administradores para obtener un formulario específico por su ID
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario
 *     responses:
 *       200:
 *         description: Formulario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormularioResponse'
 *       404:
 *         description: Formulario no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', protectAdminRoute, obtenerFormularioPorId);

/**
 * @swagger
 * /api/formularios/{id}:
 *   put:
 *     summary: Actualizar formulario
 *     description: Endpoint para administradores para actualizar un formulario existente
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [nuevo, en_revision, contactado, prospecto_calificado, no_interesado]
 *               notas:
 *                 type: string
 *                 maxLength: 1000
 *           example:
 *             estado: "contactado"
 *             notas: "Cliente contactado exitosamente, muy interesado en el servicio"
 *     responses:
 *       200:
 *         description: Formulario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormularioResponse'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Formulario no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', protectAdminRoute, actualizarFormulario);

/**
 * @swagger
 * /api/formularios/{id}/estado:
 *   patch:
 *     summary: Actualizar estado del formulario
 *     description: Endpoint para administradores para actualizar solo el estado y notas de un formulario
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [nuevo, en_revision, contactado, prospecto_calificado, no_interesado]
 *                 description: Nuevo estado del formulario
 *               notas:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Notas adicionales
 *             required:
 *               - estado
 *           example:
 *             estado: "prospecto_calificado"
 *             notas: "Cliente calificado como prospecto de alto valor"
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormularioResponse'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Formulario no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/estado', protectAdminRoute, actualizarEstadoFormulario);

/**
 * @swagger
 * /api/formularios/{id}:
 *   delete:
 *     summary: Eliminar formulario
 *     description: Endpoint para administradores para eliminar un formulario
 *     tags: [Formularios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario
 *     responses:
 *       200:
 *         description: Formulario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Formulario eliminado exitosamente"
 *       404:
 *         description: Formulario no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', protectAdminRoute, eliminarFormulario);

module.exports = router;
