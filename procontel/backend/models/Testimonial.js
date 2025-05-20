const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '/user-avatar-placeholder.png' // Puedes usar una imagen por defecto
    },
    text: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial; 