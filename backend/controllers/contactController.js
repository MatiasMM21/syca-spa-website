const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Controlador para enviar correos electrónicos del formulario de contacto
 */
const sendContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validación básica
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  try {
    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Nuevo mensaje de contacto - SYCA SPA Website',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
  }
};

module.exports = { sendContactForm };