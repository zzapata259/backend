const express = require('express');
const app = express();

app.use(express.json());



// Rutas
const quizRoutes = require('./routes/quiz.routes');
app.use('/api/quiz', quizRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);


// Levantar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
