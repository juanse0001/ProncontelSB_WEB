const Formulario = require('../models/Formulario');
const asyncHandler = require('express-async-handler');

/**
 * @desc Crear un nuevo formulario
 * @route POST /api/formularios
 * @access Public
 */
const crearFormulario = asyncHandler(async (req, res) => {
  try {
    const formulario = new Formulario(req.body);
    const formularioGuardado = await formulario.save();
    
    res.status(201).json({
      success: true,
      message: 'Formulario enviado exitosamente',
      data: formularioGuardado
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errores
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * @desc Obtener todos los formularios
 * @route GET /api/formularios
 * @access Private (Admin)
 */
const obtenerFormularios = asyncHandler(async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      estado, 
      nivelInteres,
      fechaDesde,
      fechaHasta,
      sortBy = 'fechaEnvio',
      sortOrder = 'desc'
    } = req.query;

    // Construir filtros
    const filtros = {};
    
    if (estado) {
      filtros.estado = estado;
    }
    
    if (nivelInteres) {
      filtros.nivelInteres = nivelInteres;
    }
    
    if (fechaDesde || fechaHasta) {
      filtros.fechaEnvio = {};
      if (fechaDesde) {
        filtros.fechaEnvio.$gte = new Date(fechaDesde);
      }
      if (fechaHasta) {
        filtros.fechaEnvio.$lte = new Date(fechaHasta);
      }
    }

    // Construir ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const formularios = await Formulario.find(filtros)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Formulario.countDocuments(filtros);

    res.json({
      success: true,
      data: formularios,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener formularios',
      error: error.message
    });
  }
});

/**
 * @desc Obtener un formulario por ID
 * @route GET /api/formularios/:id
 * @access Private (Admin)
 */
const obtenerFormularioPorId = asyncHandler(async (req, res) => {
  try {
    const formulario = await Formulario.findById(req.params.id).select('-__v');
    
    if (!formulario) {
      return res.status(404).json({
        success: false,
        message: 'Formulario no encontrado'
      });
    }

    res.json({
      success: true,
      data: formulario
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de formulario inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener formulario',
      error: error.message
    });
  }
});

/**
 * @desc Actualizar un formulario
 * @route PUT /api/formularios/:id
 * @access Private (Admin)
 */
const actualizarFormulario = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizacion = req.body;

    // Campos que no se pueden actualizar directamente
    const camposNoPermitidos = ['_id', 'fechaEnvio', 'createdAt', 'updatedAt'];
    camposNoPermitidos.forEach(campo => delete datosActualizacion[campo]);

    const formulario = await Formulario.findByIdAndUpdate(
      id,
      { 
        ...datosActualizacion,
        fechaUltimaActualizacion: new Date()
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-__v');

    if (!formulario) {
      return res.status(404).json({
        success: false,
        message: 'Formulario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Formulario actualizado exitosamente',
      data: formulario
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errores
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de formulario inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar formulario',
      error: error.message
    });
  }
});

/**
 * @desc Eliminar un formulario
 * @route DELETE /api/formularios/:id
 * @access Private (Admin)
 */
const eliminarFormulario = asyncHandler(async (req, res) => {
  try {
    const formulario = await Formulario.findByIdAndDelete(req.params.id);

    if (!formulario) {
      return res.status(404).json({
        success: false,
        message: 'Formulario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Formulario eliminado exitosamente'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de formulario inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al eliminar formulario',
      error: error.message
    });
  }
});

/**
 * @desc Actualizar estado de un formulario
 * @route PATCH /api/formularios/:id/estado
 * @access Private (Admin)
 */
const actualizarEstadoFormulario = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas } = req.body;

    const estadosValidos = ['nuevo', 'en_revision', 'contactado', 'prospecto_calificado', 'no_interesado'];
    
    if (estado && !estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Estados válidos: ' + estadosValidos.join(', ')
      });
    }

    const datosActualizacion = {
      fechaUltimaActualizacion: new Date()
    };

    if (estado) datosActualizacion.estado = estado;
    if (notas !== undefined) datosActualizacion.notas = notas;

    const formulario = await Formulario.findByIdAndUpdate(
      id,
      datosActualizacion,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!formulario) {
      return res.status(404).json({
        success: false,
        message: 'Formulario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Estado del formulario actualizado exitosamente',
      data: formulario
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de formulario inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estado del formulario',
      error: error.message
    });
  }
});

/**
 * @desc Obtener estadísticas de formularios
 * @route GET /api/formularios/estadisticas
 * @access Private (Admin)
 */
const obtenerEstadisticas = asyncHandler(async (req, res) => {
  try {
    const estadisticas = await Formulario.aggregate([
      {
        $group: {
          _id: null,
          totalFormularios: { $sum: 1 },
          porEstado: {
            $push: '$estado'
          },
          porNivelInteres: {
            $push: '$nivelInteres'
          },
          porPreferenciaContacto: {
            $push: '$preferenciaContacto'
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalFormularios: 1,
          formulariosPorEstado: {
            $reduce: {
              input: '$porEstado',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{ k: '$$this', v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] } }]
                    ]
                  }
                ]
              }
            }
          },
          formulariosPorNivelInteres: {
            $reduce: {
              input: '$porNivelInteres',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{ k: '$$this', v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] } }]
                    ]
                  }
                ]
              }
            }
          },
          formulariosPorPreferenciaContacto: {
            $reduce: {
              input: '$porPreferenciaContacto',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [{ k: '$$this', v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] } }]
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: estadisticas[0] || {
        totalFormularios: 0,
        formulariosPorEstado: {},
        formulariosPorNivelInteres: {},
        formulariosPorPreferenciaContacto: {}
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

module.exports = {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
  actualizarEstadoFormulario,
  obtenerEstadisticas
};
