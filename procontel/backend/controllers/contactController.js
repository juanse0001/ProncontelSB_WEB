const Contact = require('../models/Contact');
const { enviarCorreo } = require('../services/mailService'); // Importar el servicio de correo

// Crear un nuevo mensaje de contacto
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Mensaje enviado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener todos los mensajes de contacto
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ fecha: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener un mensaje de contacto específico
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Mensaje no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Actualizar el estado de un mensaje
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Mensaje no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Nueva función para responder un mensaje de contacto por email y actualizar estado
exports.replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyBody } = req.body;

    if (!replyBody) {
      return res.status(400).json({ success: false, message: 'El cuerpo de la respuesta no puede estar vacío.' });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Mensaje de contacto no encontrado.' });
    }

    // Construir el cuerpo del correo en HTML
    const emailBodyHTML = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <img src="${process.env.FRONTEND_PUBLIC_URL || 'TU_URL_PUBLICA_DE_FALLBACK_AQUI'}/Logo.jpg" alt="Logo Procontel SB" style="max-width: 150px;"/>
        </div>
        <div style="padding: 20px 0;">
          <p>Hola <strong>${contact.nombre}</strong>,</p>
          <p>¡Gracias por contactarte con Procontel SB! Recibimos tu mensaje y con gusto te brindamos la siguiente respuesta:</p>
          
          <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #007bff; background-color: #f8f9fa;">
            <p style="font-style: italic; color: #555;"><strong>Tu mensaje original:</strong></p>
            <p style="color: #333;">${contact.mensaje}</p>
          </div>
          
          <p><strong>Nuestra respuesta:</strong></p>
          <p>${replyBody}</p>

          <p>Si tienes más preguntas, no dudes en contactarnos.</p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #888;">
          <p>&copy; ${new Date().getFullYear()} Procontel SB. Todos los derechos reservados.</p>
        </div>
      </div>
    `;

    await enviarCorreo(
      contact.email,
      `Respuesta a tu mensaje de ${process.env.EMAIL_FROM || process.env.EMAIL_USER}`,
      '', // Puedes poner un texto plano simple aquí si quieres, o dejarlo vacío
      emailBodyHTML // Pasar el cuerpo HTML como el cuarto argumento
    );

    contact.replies.push({
      replyBody: replyBody,
      replyDate: new Date()
    });

    contact.estado = 'respondido';

    await contact.save();

    res.status(200).json({ success: true, message: 'Respuesta enviada por correo y guardada exitosamente.', data: contact });

  } catch (error) {
    console.error('[ContactController] Error al responder mensaje:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al enviar la respuesta.', error: error.message });
  }
}; 