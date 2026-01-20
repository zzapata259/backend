const usuarios = require('../data/auth.data');

// Registro
const registrarUsuario = (req, res) => {
  const { username, password } = req.body;

  // Validación básica
  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  // Verificar si ya existe
  const usuarioExistente = usuarios.find(u => u.username === username);
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  // Guardar usuario
  usuarios.push({ username, password });

  res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
};

// Login
const loginUsuario = (req, res) => {
  const { username, password } = req.body;

  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }

  res.json({ mensaje: 'Login exitoso', usuario: { username: usuario.username } });
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
