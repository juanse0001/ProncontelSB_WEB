const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  telefono: {
    type: String,
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es requerido'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'leído', 'respondido'],
    default: 'pendiente'
  },
  replies: [
    {
      replyBody: {
        type: String,
        required: true
      },
      replyDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Contact', contactSchema); 