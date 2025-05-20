const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { protectAdminRoute } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', testimonialController.getTestimonials);
router.post('/', testimonialController.createTestimonial);

// Rutas protegidas (solo admin)
router.put('/:id/status', protectAdminRoute, testimonialController.updateTestimonialStatus);

module.exports = router; 