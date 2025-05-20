const nodemailer = require('nodemailer');
require('dotenv').config(); // Asegúrate de tener dotenv instalado y configurado

// Configuración del transportador SMTP
// Es crucial usar una contraseña de aplicación si usas 2-Step Verification en Gmail.
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail', // Puedes configurar el servicio via env var
  auth: {
    user: process.env.EMAIL_USER,  // Tu correo
    pass: process.env.EMAIL_PASS   // Contraseña de aplicación o contraseña habitual
  },
});

// Función para enviar el correo
async function enviarCorreo(destinatario, asunto, mensaje, htmlMensaje = null) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Opcional: usar FROM diferente
    to: destinatario,
    subject: asunto,
    text: mensaje,
    html: htmlMensaje, // Permite enviar HTML si se proporciona
  };

  try {
    console.log(`[MailService] Intentando enviar correo a ${destinatario} con asunto: ${asunto}`);
    let info = await transporter.sendMail(mailOptions);
    console.log('[MailService] Correo enviado exitosamente:', info.messageId);
    return info;
  } catch (error) {
    console.error('[MailService] Error al enviar el correo:', error.message);
    // Dependiendo de cómo quieras manejar los errores, podrías relanzarlo:
    // throw new Error(`No se pudo enviar el correo a ${destinatario}: ${error.message}`);
    throw error; // Relanzar el error original
  }
}

module.exports = { enviarCorreo }; 