const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// En una aplicación real, esto vendría de una base de datos.
// Contraseña 'adminpassword' hasheada con bcrypt.hashSync('adminpassword', 10)
const mockAdminUsers = [
    {
        id: 'admin001',
        email: 'admin@example.com',
        passwordHash: '$2b$10$ZDCcabcFQXh2IHuwWPc5D.MckS84FuqG1rnphuXVCcIYgiBvKKOry', // Hash para 'adminpassword'
        role: 'admin'
    }
];

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    const adminUser = mockAdminUsers.find(user => user.email === email);

    if (!adminUser) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, adminUser.passwordHash);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const tokenPayload = {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
    };

    const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
});

module.exports = router;
