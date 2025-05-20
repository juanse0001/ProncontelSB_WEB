const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Contacto - Procontel SB',
      version: '1.0.0',
      description: 'API para el manejo de mensajes de contacto de Procontel SB',
      contact: {
        name: 'Procontel SB',
        email: 'procontelsb1@gmail.com',
        url: 'https://procontel-sb.vercel.app'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['nombre', 'email', 'mensaje'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo del remitente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del remitente'
            },
            telefono: {
              type: 'string',
              description: 'Número de teléfono del remitente'
            },
            empresa: {
              type: 'string',
              description: 'Nombre de la empresa del remitente'
            },
            mensaje: {
              type: 'string',
              description: 'Mensaje del remitente'
            },
            fecha: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de envío del mensaje'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'leído', 'respondido'],
              description: 'Estado del mensaje'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'] // archivos que contienen las anotaciones
};

module.exports = swaggerJsdoc(options); 