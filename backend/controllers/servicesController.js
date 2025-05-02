/**
 * Controlador para servicios
 */

// Datos mockup para los servicios (en una aplicación real, esto vendría de una base de datos)
const services = [
  { 
    id: 1, 
    title: 'Electricidad Automotriz', 
    description: 'Servicios completos de diagnóstico y reparación de sistemas eléctricos para todo tipo de vehículos.', 
    details: [
      'Diagnóstico electrónico computarizado',
      'Reparación de alternadores y motores de arranque',
      'Instalación de sistemas de iluminación',
      'Reparación de sistemas de climatización',
      'Servicio para vehículos diésel y gasolina'
    ],
    image: '/images/auto-electric.jpg'
  },
  { 
    id: 2, 
    title: 'Electricidad Domiciliaria', 
    description: 'Instalaciones y reparaciones eléctricas para hogares con la máxima seguridad y profesionalismo.', 
    details: [
      'Instalaciones eléctricas completas',
      'Reparaciones y mantenimiento',
      'Actualización de tableros eléctricos',
      'Instalación de luminarias',
      'Detección y solución de fallas'
    ],
    image: '/images/home-electric.jpg'
  },
  { 
    id: 3, 
    title: 'Reparación de Fallas', 
    description: 'Diagnóstico preciso y solución de todo tipo de fallas eléctricas, tanto automotrices como domiciliarias.', 
    details: [
      'Diagnóstico avanzado de fallas',
      'Reparación de cortocircuitos',
      'Solución a problemas de arranque',
      'Reparación de sistemas de carga',
      'Análisis de consumo eléctrico irregular'
    ],
    image: '/images/repair.jpg'
  },
  { 
    id: 4, 
    title: 'Instalación de Accesorios', 
    description: 'Instalación profesional de accesorios eléctricos para vehículos y domicilios.', 
    details: [
      'Instalación de luces LED',
      'Sistemas de audio y multimedia',
      'Alarmas y sistemas de seguridad',
      'Cámaras de retroceso',
      'Sensores de estacionamiento'
    ],
    image: '/images/accessories.jpg'
  },
  { 
    id: 5, 
    title: 'Automatización', 
    description: 'Soluciones de automatización para mejorar la eficiencia y seguridad de su hogar o negocio.', 
    details: [
      'Instalación de sistemas domóticos',
      'Control de iluminación',
      'Automatización de portones',
      'Sistemas de seguridad',
      'Control remoto de dispositivos'
    ],
    image: '/images/automation.jpg'
  }
];

// Obtener todos los servicios
const getAllServices = (req, res) => {
  try {
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
  }
};

// Obtener servicio por ID
const getServiceById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const service = services.find(s => s.id === id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    }
    
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el servicio' });
  }
};

module.exports = { getAllServices, getServiceById };