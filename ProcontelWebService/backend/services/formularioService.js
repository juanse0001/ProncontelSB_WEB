const Formulario = require('../models/Formulario');
const nodemailer = require('nodemailer');

/**
 * Servicio para manejar la lógica de negocio de formularios
 */
class FormularioService {
  
  /**
   * Crear un nuevo formulario con validaciones adicionales
   * @param {Object} datosFormulario - Datos del formulario
   * @returns {Promise<Object>} Formulario creado
   */
  static async crearFormulario(datosFormulario) {
    try {
      // Validaciones de negocio adicionales
      await this.validarDatosFormulario(datosFormulario);
      
      // Crear el formulario
      const formulario = new Formulario(datosFormulario);
      const formularioGuardado = await formulario.save();
      
      // Enviar notificación por email (opcional)
      await this.enviarNotificacionFormulario(formularioGuardado);
      
      return formularioGuardado;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validar datos del formulario con reglas de negocio
   * @param {Object} datos - Datos a validar
   */
  static async validarDatosFormulario(datos) {
    // Verificar si ya existe un formulario con el mismo email en las últimas 24 horas
    const fechaLimite = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formularioExistente = await Formulario.findOne({
      correoElectronico: datos.correoElectronico,
      fechaEnvio: { $gte: fechaLimite }
    });

    if (formularioExistente) {
      throw new Error('Ya has enviado un formulario en las últimas 24 horas. Por favor, espera antes de enviar otro.');
    }

    // Validar que las opciones seleccionadas en valorasEnFacturacion sean válidas
    const opcionesValidas = [
      'Facilidad de uso',
      'Precio competitivo', 
      'Soporte al cliente',
      'Reportes e informes',
      'Integración con otros sistemas'
    ];

    if (datos.valorasEnFacturacion) {
      const opcionesInvalidas = datos.valorasEnFacturacion.filter(
        opcion => !opcionesValidas.includes(opcion)
      );
      
      if (opcionesInvalidas.length > 0) {
        throw new Error(`Opciones inválidas en valorasEnFacturacion: ${opcionesInvalidas.join(', ')}`);
      }
    }
  }

  /**
   * Enviar notificación por email cuando se crea un formulario
   * @param {Object} formulario - Formulario creado
   */
  static async enviarNotificacionFormulario(formulario) {
    try {
      // Configurar transporter de email
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      // Email para el administrador
      const emailAdmin = {
        from: process.env.SMTP_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `Nuevo formulario de ${formulario.nombreCompleto}`,
        html: this.generarEmailAdmin(formulario)
      };

      // Email de confirmación para el usuario
      const emailUsuario = {
        from: process.env.SMTP_FROM,
        to: formulario.correoElectronico,
        subject: 'Gracias por tu interés en Procontel SB',
        html: this.generarEmailUsuario(formulario)
      };

      // Enviar emails
      await transporter.sendMail(emailAdmin);
      await transporter.sendMail(emailUsuario);

    } catch (error) {
      // No lanzar error si falla el envío de email, solo logear
      console.error('Error enviando notificación de formulario:', error.message);
    }
  }

  /**
   * Generar HTML para email del administrador
   * @param {Object} formulario - Datos del formulario
   * @returns {string} HTML del email
   */
  static generarEmailAdmin(formulario) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Nuevo Formulario Recibido</h2>
        
        <h3>Información del Cliente:</h3>
        <p><strong>Nombre:</strong> ${formulario.nombreCompleto}</p>
        <p><strong>Negocio:</strong> ${formulario.nombreNegocio}</p>
        <p><strong>Email:</strong> ${formulario.correoElectronico}</p>
        <p><strong>Teléfono:</strong> ${formulario.numeroContacto}</p>
        <p><strong>Ubicación:</strong> ${formulario.ubicacion}</p>
        
        <h3>Respuestas del Formulario:</h3>
        <p><strong>Usa facturación electrónica:</strong> ${formulario.usaFacturacionElectronica}</p>
        <p><strong>Tiene sistema POS:</strong> ${formulario.tieneSistemaPOS}</p>
        <p><strong>Lo que más valora:</strong> ${formulario.valorasEnFacturacion.join(', ')}</p>
        <p><strong>Nivel de interés:</strong> ${formulario.nivelInteres}</p>
        <p><strong>Preferencia de contacto:</strong> ${formulario.preferenciaContacto}</p>
        
        <h3>Comentarios:</h3>
        <p><strong>Mejora sugerida:</strong> ${formulario.mejoraSugerida}</p>
        
        <hr>
        <p><em>Fecha de envío: ${formulario.fechaEnvio.toLocaleString('es-CO')}</em></p>
      </div>
    `;
  }

  /**
   * Generar HTML para email del usuario
   * @param {Object} formulario - Datos del formulario
   * @returns {string} HTML del email
   */
  static generarEmailUsuario(formulario) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">¡Gracias por tu interés en Procontel SB!</h2>
        
        <p>Hola ${formulario.nombreCompleto},</p>
        
        <p>Hemos recibido tu formulario y estamos muy contentos de que te interese conocer más sobre nuestros servicios de facturación electrónica y sistemas POS.</p>
        
        <p>Nuestro equipo se pondrá en contacto contigo muy pronto por ${formulario.preferenciaContacto.toLowerCase()} para brindarte la información que necesitas.</p>
        
        <h3>¿Qué sigue?</h3>
        <ul>
          <li>Revisaremos tu información y necesidades</li>
          <li>Te contactaremos en las próximas 24 horas</li>
          <li>Te ofreceremos una demostración personalizada</li>
        </ul>
        
        <p>Si tienes alguna pregunta urgente, no dudes en contactarnos.</p>
        
        <hr>
        <p><strong>Equipo Procontel SB</strong><br>
        📧 info@procontel.com<br>
        📱 +57 (1) 234-5678</p>
      </div>
    `;
  }

  /**
   * Obtener formularios con filtros avanzados
   * @param {Object} filtros - Filtros de búsqueda
   * @returns {Promise<Object>} Resultados paginados
   */
  static async obtenerFormularios(filtros = {}) {
    const {
      page = 1,
      limit = 10,
      estado,
      nivelInteres,
      fechaDesde,
      fechaHasta,
      sortBy = 'fechaEnvio',
      sortOrder = 'desc',
      busqueda
    } = filtros;

    // Construir filtros de búsqueda
    const query = {};

    if (estado) query.estado = estado;
    if (nivelInteres) query.nivelInteres = nivelInteres;

    if (fechaDesde || fechaHasta) {
      query.fechaEnvio = {};
      if (fechaDesde) query.fechaEnvio.$gte = new Date(fechaDesde);
      if (fechaHasta) query.fechaEnvio.$lte = new Date(fechaHasta);
    }

    // Búsqueda por texto en múltiples campos
    if (busqueda) {
      query.$or = [
        { nombreCompleto: { $regex: busqueda, $options: 'i' } },
        { nombreNegocio: { $regex: busqueda, $options: 'i' } },
        { correoElectronico: { $regex: busqueda, $options: 'i' } },
        { ubicacion: { $regex: busqueda, $options: 'i' } }
      ];
    }

    // Configurar ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [formularios, total] = await Promise.all([
      Formulario.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Formulario.countDocuments(query)
    ]);

    return {
      formularios,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    };
  }

  /**
   * Obtener estadísticas avanzadas de formularios
   * @returns {Promise<Object>} Estadísticas
   */
  static async obtenerEstadisticas() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalFormularios: { $sum: 1 },
          formulariosPorEstado: { $push: '$estado' },
          formulariosPorNivelInteres: { $push: '$nivelInteres' },
          formulariosPorPreferenciaContacto: { $push: '$preferenciaContacto' },
          formulariosPorUbicacion: { $push: '$ubicacion' },
          formulariosPorMes: {
            $push: {
              $dateToString: { format: "%Y-%m", date: "$fechaEnvio" }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalFormularios: 1,
          formulariosPorEstado: {
            $reduce: {
              input: '$formulariosPorEstado',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{
                        k: '$$this',
                        v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                      }]
                    ]
                  }
                ]
              }
            }
          },
          formulariosPorNivelInteres: {
            $reduce: {
              input: '$formulariosPorNivelInteres',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{
                        k: '$$this',
                        v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                      }]
                    ]
                  }
                ]
              }
            }
          },
          formulariosPorPreferenciaContacto: {
            $reduce: {
              input: '$formulariosPorPreferenciaContacto',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{
                        k: '$$this',
                        v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                      }]
                    ]
                  }
                ]
              }
            }
          },
          formulariosPorMes: {
            $reduce: {
              input: '$formulariosPorMes',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{
                        k: '$$this',
                        v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                      }]
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    ];

    const estadisticas = await Formulario.aggregate(pipeline);
    return estadisticas[0] || {
      totalFormularios: 0,
      formulariosPorEstado: {},
      formulariosPorNivelInteres: {},
      formulariosPorPreferenciaContacto: {},
      formulariosPorMes: {}
    };
  }

  /**
   * Marcar formulario como prospecto calificado
   * @param {string} formularioId - ID del formulario
   * @param {string} notas - Notas adicionales
   * @returns {Promise<Object>} Formulario actualizado
   */
  static async marcarComoProspecto(formularioId, notas = '') {
    return await Formulario.findByIdAndUpdate(
      formularioId,
      {
        estado: 'prospecto_calificado',
        notas: notas,
        fechaUltimaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    );
  }

  /**
   * Obtener prospectos calificados
   * @returns {Promise<Array>} Lista de prospectos
   */
  static async obtenerProspectos() {
    return await Formulario.find({ estado: 'prospecto_calificado' })
      .sort({ fechaEnvio: -1 })
      .select('-__v');
  }
}

module.exports = FormularioService;
