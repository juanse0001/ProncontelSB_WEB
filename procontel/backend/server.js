const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

const adminAuthRoutes = require('./routes/authRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const { protectAdminRoute } = require('./middleware/authMiddleware');

const { createContact, getContacts, getContact, updateContactStatus, replyToContact } = require('./controllers/contactController');

const app = express();

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:3000',
    'https://proncontel-sb-q0pkqewu5-juanse0001s-projects.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean); // Elimina valores undefined o null

app.use(cors({
    origin: function(origin, callback) {
        // Permite solicitudes sin origen (como aplicaciones móviles o curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS para este sitio no permite acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✅ Conexión exitosa a MongoDB');
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error al conectar con MongoDB:', err.message);
    process.exit(1);
  });

app.use('/api/admin/auth', adminAuthRoutes);

app.use('/api/testimonials', testimonialRoutes);

app.post('/api/contact', createContact);

const protectedContactRoutes = express.Router();
protectedContactRoutes.use(protectAdminRoute);

protectedContactRoutes.get('/', getContacts);
protectedContactRoutes.get('/:id', getContact);
protectedContactRoutes.patch('/:id/status', updateContactStatus);
protectedContactRoutes.post('/:id/reply', replyToContact);

app.use('/api/contact', protectedContactRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: err.message
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `🚀 Servidor backend iniciado en el puerto ${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', `📚 Documentación API disponible en: http://localhost:${PORT}/api-docs`);
});
