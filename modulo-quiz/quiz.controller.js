const quizService = require('./quiz.service'); // tu service
const partidas = require('./partidas.data');
const { v4: uuidv4 } = require('uuid');

// --------------------
// NUEVA FUNCIÓN: getQuestion
// --------------------
const getQuestion = (req, res) => {
  const pregunta = quizService.obtenerPregunta(); // llamamos al service
  res.json(pregunta);
};

// --------------------
// Funciones existentes
// --------------------

// Obtener todas las materias
const obtenerMaterias = (req, res) => {
  res.json(Object.keys(quizDatos));
};

// Obtener preguntas por materia
const obtenerPreguntasPorMateria = (req, res) => {
  const { materia } = req.params;
  const preguntas = quizDatos[materia];

  if (!preguntas) {
    return res.status(404).json({ mensaje: 'Materia no encontrada' });
  }

  res.json(preguntas);
};

// Iniciar partida
const iniciarPartida = (req, res) => {
  const { jugadores, materia } = req.body;

  if (!jugadores || jugadores.length < 2 || !materia) {
    return res.status(400).json({ mensaje: 'Se requieren al menos 2 jugadores' });
  }

  const preguntasMateria = quizDatos[materia];
  if (!preguntasMateria) {
    return res.status(404).json({ mensaje: 'Materia no encontrada' });
  }

  const partida = {
    id: uuidv4(),
    materia,
    preguntas: preguntasMateria,
    indicePregunta: 0,
    jugadores: jugadores.map(j => ({
      id: uuidv4(),
      nombre: j,
      puntaje: 0,
      respondio: false
    }))
  };

  partidas.push(partida);

  res.status(201).json({
    partidaId: partida.id,
    pregunta: preguntasMateria[0],
    jugadores: partida.jugadores
  });
};

// Responder pregunta
const responderPregunta = (req, res) => {
  const { partidaId, jugadorId, respuesta } = req.body;

  const partida = partidas.find(p => p.id === partidaId);
  if (!partida) {
    return res.status(404).json({ mensaje: 'Partida no encontrada' });
  }

  const jugador = partida.jugadores.find(j => j.id === jugadorId);
  if (!jugador) {
    return res.status(404).json({ mensaje: 'Jugador no encontrado' });
  }

  if (jugador.respondio) {
    return res.status(400).json({ mensaje: 'Ya respondiste esta pregunta' });
  }

  const preguntaActual = partida.preguntas[partida.indicePregunta];

  if (respuesta === preguntaActual.respuestaCorrecta) {
    jugador.puntaje += 1;
  }

  jugador.respondio = true;

  // Verificar si TODOS respondieron
  const todosRespondieron = partida.jugadores.every(j => j.respondio);

  if (todosRespondieron) {
    partida.jugadores.forEach(j => j.respondio = false);
    partida.indicePregunta += 1;

    if (partida.indicePregunta >= partida.preguntas.length) {
      return res.json({
        mensaje: 'Juego terminado',
        resultados: partida.jugadores
      });
    }

    return res.json({
      mensaje: 'Siguiente pregunta',
      pregunta: partida.preguntas[partida.indicePregunta]
    });
  }

  res.json({ mensaje: 'Respuesta registrada, esperando a los demás' });
};

// --------------------
// Exportar todas las funciones
// --------------------
module.exports = {
  getQuestion, // <-- nueva función exportada
  obtenerMaterias,
  obtenerPreguntasPorMateria,
  iniciarPartida,
  responderPregunta
};
