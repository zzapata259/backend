const quizDatos = require('../data/quiz.data'); // ya tienes esto arriba
const partidas = require('../data/partidas.data');
const { v4: uuidv4 } = require('uuid');

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
  const { jugador, materia } = req.body;

  if (!jugador || !materia) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  const preguntasMateria = quizDatos[materia];
  if (!preguntasMateria) {
    return res.status(404).json({ mensaje: 'Materia no encontrada' });
  }

  const partida = {
    id: uuidv4(),
    jugador,
    materia,
    preguntas: preguntasMateria,
    indicePregunta: 0,
    puntaje: 0
  };

  partidas.push(partida);

  const { pregunta, opciones } = preguntasMateria[0];

  res.status(201).json({
    mensaje: 'Partida iniciada',
    partidaId: partida.id,
    pregunta,
    opciones
  });
};


// Responder pregunta 
const responderPregunta = (req, res) => {
  const { partidaId, respuesta } = req.body;

  const partida = partidas.find(p => p.id === partidaId);
  if (!partida) {
    return res.status(404).json({ mensaje: 'Partida no encontrada' });
  }

  const preguntaActual = partida.preguntas[partida.indicePregunta];

  const esCorrecta = respuesta === preguntaActual.correcta;
  if (esCorrecta) {
    partida.puntaje += 1;
  }

  partida.indicePregunta += 1;

  // ¿Terminó el juego?
  if (partida.indicePregunta >= partida.preguntas.length) {
    return res.json({
      mensaje: 'Juego terminado',
      puntaje: partida.puntaje,
      totalPreguntas: partida.preguntas.length
    });
  }

  // Siguiente pregunta
  const siguiente = partida.preguntas[partida.indicePregunta];

  res.json({
    correcta: esCorrecta,
    pregunta: siguiente.pregunta,
    opciones: siguiente.opciones
  });
};


// ⚠️ Exportar todas las funciones
module.exports = {
  obtenerMaterias,
  obtenerPreguntasPorMateria,
  iniciarPartida,
  responderPregunta
};
