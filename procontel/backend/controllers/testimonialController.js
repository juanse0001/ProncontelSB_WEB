const Testimonial = require('../models/Testimonial');

// @desc    Obtener todos los testimonios (aprobados para el frontend)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener testimonios' });
  }
};

// @desc    Crear un nuevo testimonio
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
  try {
    const { author, text, company, rating, avatar } = req.body;

    if (!author || !text || !rating) {
      return res.status(400).json({
        message: 'Por favor incluye todos los campos requeridos: autor, texto y calificación'
      });
    }

    const testimonial = new Testimonial({
      author,
      text,
      company,
      rating,
      avatar: avatar || '/user-avatar-placeholder.png'
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear testimonio' });
  }
};

// @desc    Actualizar estado de un testimonio
// @route   PUT /api/testimonials/:id/status
// @access  Private/Admin
const updateTestimonialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonio no encontrado' });
    }

    testimonial.status = status;
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar testimonio' });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonialStatus
}; 