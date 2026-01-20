const express = require('express');
const router = express.Router();
const {
  obtenerMaterias,
  obtenerPreguntasPorMateria,
  iniciarPartida,
  responderPregunta,
  getQuestion // <-- agregamos la nueva función
} = require('./quiz.controller');

// Rutas existentes
router.get('/materias', obtenerMaterias);
router.get('/preguntas/:materia', obtenerPreguntasPorMateria);

// Nuevas rutas de juego
router.post('/partida/iniciar', iniciarPartida);
router.post('/partida/responder', responderPregunta);

// Nueva ruta para obtener una pregunta individual
router.get('/pregunta', getQuestion); // <-- aquí usamos GET, sin parámetros por ahora

module.exports = router;
