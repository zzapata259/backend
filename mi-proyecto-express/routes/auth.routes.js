const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  loginUsuario
} = require('../controller/auth.controller');

// Registro
router.post('/register', registrarUsuario);

// Login
router.post('/login', loginUsuario);

module.exports = router;
