const preguntas = require('./quiz.data');

exports.obtenerPregunta = () => {
  return preguntas[0];
};
