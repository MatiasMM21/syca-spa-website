const express = require('express');
const router = express.Router();
const { sendContactForm } = require('../controllers/contactController');

// Ruta para enviar el formulario de contacto
router.post('/', sendContactForm);

module.exports = router;