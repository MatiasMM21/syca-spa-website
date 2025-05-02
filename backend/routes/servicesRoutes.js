const express = require('express');
const router = express.Router();
const { 
  getAllServices, 
  getServiceById 
} = require('../controllers/servicesController');

// Rutas para servicios
router.get('/', getAllServices);
router.get('/:id', getServiceById);

module.exports = router;