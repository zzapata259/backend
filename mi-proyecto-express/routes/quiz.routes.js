const express = require('express');
const router = express.Router();
const {
  obtenerMaterias,
  obtenerPreguntasPorMateria,
  iniciarPartida,
  responderPregunta
} = require('../controller/quiz.controller');

router.get('/materias', obtenerMaterias);
router.get('/preguntas/:materia', obtenerPreguntasPorMateria);

// Rutas de juego
router.post('/partida/iniciar', iniciarPartida);
router.post('/partida/responder', responderPregunta);

module.exports = router;
