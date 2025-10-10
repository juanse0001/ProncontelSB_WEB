const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact
} = require('../controllers/contactController');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Crear un nuevo mensaje de contacto
 *     tags: [Contacto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Mensaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *                 message:
 *                   type: string
 *                   example: Mensaje enviado exitosamente
 *       400:
 *         description: Error en la validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Obtener todos los mensajes de contacto
 *     tags: [Contacto]
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getContacts);

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Obtener un mensaje de contacto específico
 *     tags: [Contacto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Mensaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getContact);

/**
 * @swagger
 * /api/contact/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de un mensaje
 *     tags: [Contacto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, leído, respondido]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Mensaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/status', updateContactStatus);

/**
 * @swagger
 * /api/contact/{id}/reply:
 *   post:
 *     summary: Enviar una respuesta por correo electrónico a un mensaje de contacto y opcionalmente actualizar su estado
 *     tags: [Contacto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje de contacto a responder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - replyBody
 *             properties:
 *               replyBody:
 *                 type: string
 *                 description: El cuerpo del correo electrónico de respuesta
 *     responses:
 *       200: Resultado de éxito con mensaje
 *       400: Solicitud inválida (ej. cuerpo de respuesta vacío)
 *       404: Mensaje de contacto no encontrado
 *       500: Error interno del servidor al enviar el correo
 */
router.post('/:id/reply', replyToContact);

module.exports = router; 