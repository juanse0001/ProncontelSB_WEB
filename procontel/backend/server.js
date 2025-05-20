const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Asegúrate que este archivo exista y esté bien configurado
require('dotenv').config();

// Importaciones para la autenticación de administrador con JWT
const adminAuthRoutes = require('./routes/authRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const { protectAdminRoute } = require('./middleware/authMiddleware');

// Importar funciones específicas del controlador de contactos
const { createContact, getContacts, getContact, updateContactStatus, replyToContact } = require('./controllers/contactController');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/procontel')
  .then(() => {})
  .catch(err => {
    process.exit(1);
  });

// Rutas de autenticación para administradores (no protegidas por protectAdminRoute, tienen su propia lógica)
// Ejemplo: POST /api/admin/auth/login
app.use('/api/admin/auth', adminAuthRoutes);

// Rutas de testimonios
app.use('/api/testimonials', testimonialRoutes);

// Rutas de contacto
// Ruta pública para crear un nuevo mensaje de contacto
app.post('/api/contact', createContact);

// Crear un router específico para las rutas de contacto protegidas
const protectedContactRoutes = express.Router();

// Aplicar el middleware de protección solo a este router
protectedContactRoutes.use(protectAdminRoute);

// Definir las rutas protegidas usando el router protegido
protectedContactRoutes.get('/', getContacts);
protectedContactRoutes.get('/:id', getContact);
protectedContactRoutes.patch('/:id/status', updateContactStatus);
protectedContactRoutes.post('/:id/reply', replyToContact);

// Usar el router protegido bajo el prefijo /api/contact
// Nota: La ruta POST /api/contact ya fue definida arriba como pública
app.use('/api/contact', protectedContactRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Manejo de errores general
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: err.message
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {});
