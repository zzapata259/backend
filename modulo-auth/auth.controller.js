const authService = require('./auth.service');

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const result = await authService.registrar(req.body);
    res.status(201).json(result);
  } catch (error) {
  console.error('🔥 ERROR REAL:', error);

  res.status(error.status || 500).json({
    mensaje: error.message || 'Error interno del servidor'
  });
}

};

// Login (lo que te pidieron)
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ mensaje: error.message });
  }
};
