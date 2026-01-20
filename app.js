const express = require('express');
const cors = require('cors');

require('./config/database'); // conecta postgres

const api = require('./api');

const app = express();

app.use(cors());
app.use(express.json());

// 👇 API CENTRAL
app.use('/api', api);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
