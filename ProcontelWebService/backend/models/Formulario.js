const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  // Sección 1: Información básica
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre completo es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  nombreNegocio: {
    type: String,
    required: [true, 'El nombre del negocio es requerido'],
    trim: true,
    minlength: [2, 'El nombre del negocio debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre del negocio no puede exceder 100 caracteres']
  },
  numeroContacto: {
    type: String,
    required: [true, 'El número de contacto es requerido'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Por favor ingrese un número de contacto válido']
  },
  correoElectronico: {
    type: String,
    required: [true, 'El correo electrónico es requerido'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo electrónico válido']
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es requerida'],
    trim: true,
    minlength: [2, 'La ubicación debe tener al menos 2 caracteres'],
    maxlength: [100, 'La ubicación no puede exceder 100 caracteres']
  },

  // Sección 2: Intereses y uso actual
  usaFacturacionElectronica: {
    type: String,
    required: [true, 'Debe especificar si usa facturación electrónica'],
    enum: {
      values: ['Sí', 'No', 'Estoy en proceso de implementarlo'],
      message: 'Debe seleccionar una opción válida para facturación electrónica'
    }
  },
  tieneSistemaPOS: {
    type: String,
    required: [true, 'Debe especificar si tiene sistema POS'],
    enum: {
      values: ['Sí, ya tengo uno', 'No, pero me interesa', 'No lo necesito por ahora'],
      message: 'Debe seleccionar una opción válida para sistema POS'
    }
  },
  valorasEnFacturacion: {
    type: [String],
    required: [true, 'Debe seleccionar al menos una opción de lo que más valora'],
    validate: {
      validator: function(arr) {
        const opcionesValidas = [
          'Facilidad de uso',
          'Precio competitivo',
          'Soporte al cliente',
          'Reportes e informes',
          'Integración con otros sistemas'
        ];
        return arr.length >= 1 && arr.length <= 2 && 
               arr.every(opcion => opcionesValidas.includes(opcion));
      },
      message: 'Debe seleccionar entre 1 y 2 opciones válidas de lo que más valora'
    }
  },

  // Sección 3: Opinión sobre Procontel SB
  atractivoServicio: {
    type: String,
    required: [true, 'Debe especificar qué le parece más atractivo del servicio'],
    enum: {
      values: [
        'Facturación ilimitada',
        'Manejo de inventarios',
        'Reportes con gráficas',
        'Integración con otros sistemas',
        'Asesoría personalizada'
      ],
      message: 'Debe seleccionar una opción válida de lo que le parece más atractivo'
    }
  },
  mejoraSugerida: {
    type: String,
    required: [true, 'Debe proporcionar una sugerencia de mejora'],
    trim: true,
    minlength: [10, 'La sugerencia debe tener al menos 10 caracteres'],
    maxlength: [500, 'La sugerencia no puede exceder 500 caracteres']
  },
  beneficioAdicional: {
    type: String,
    required: [true, 'Debe seleccionar un beneficio adicional'],
    enum: {
      values: [
        'Descuentos por pago anual',
        'Capacitación gratuita',
        'Integraciones sin costo',
        'Soporte premium'
      ],
      message: 'Debe seleccionar un beneficio adicional válido'
    }
  },

  // Sección 4: Decisión y contacto
  nivelInteres: {
    type: String,
    required: [true, 'Debe especificar su nivel de interés'],
    enum: {
      values: ['Muy interesado', 'Interesado', 'Poco interesado'],
      message: 'Debe seleccionar un nivel de interés válido'
    }
  },
  preferenciaContacto: {
    type: String,
    required: [true, 'Debe especificar su preferencia de contacto'],
    enum: {
      values: ['WhatsApp', 'Llamada telefónica', 'Correo electrónico'],
      message: 'Debe seleccionar una preferencia de contacto válida'
    }
  },

  // Metadatos del formulario
  fechaEnvio: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['nuevo', 'en_revision', 'contactado', 'prospecto_calificado', 'no_interesado'],
    default: 'nuevo'
  },
  notas: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas no pueden exceder 1000 caracteres']
  },
  fechaUltimaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para actualizar fechaUltimaActualizacion antes de guardar
formularioSchema.pre('save', function(next) {
  this.fechaUltimaActualizacion = new Date();
  next();
});

// Índices para optimizar consultas
formularioSchema.index({ correoElectronico: 1 });
formularioSchema.index({ estado: 1 });
formularioSchema.index({ fechaEnvio: -1 });
formularioSchema.index({ nivelInteres: 1 });

module.exports = mongoose.model('Formulario', formularioSchema);
