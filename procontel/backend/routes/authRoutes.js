const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Las credenciales deben venir de variables de entorno
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_ID = process.env.ADMIN_ID;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    // Verificar si las credenciales coinciden con las variables de entorno
    if (email !== ADMIN_EMAIL) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const tokenPayload = {
        id: ADMIN_ID,
        email: ADMIN_EMAIL,
        role: 'admin'
    };

    const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
});

module.exports = router;
