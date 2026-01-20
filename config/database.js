const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'quizuser',
  password: 'quizpass',
  database: 'quizdb'
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL conectado');
});

module.exports = pool;
