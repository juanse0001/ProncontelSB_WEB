const jwt = require('jsonwebtoken');

const protectAdminRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: 'Acceso denegado. No se proporcionó token.' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar si el token ha expirado
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ 
                success: false,
                message: 'Token expirado. Por favor, inicie sesión nuevamente.' 
            });
        }

        // Verificar rol de administrador
        if (decoded.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Acceso denegado: no eres administrador.' 
            });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Error al verificar token:", err.message);
        return res.status(401).json({ 
            success: false,
            message: 'Token no válido o expirado.' 
        });
    }
};

module.exports = { protectAdminRoute };