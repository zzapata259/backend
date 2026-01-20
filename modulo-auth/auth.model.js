const db = require('../config/database');

/**
 * Buscar usuario por email
 */
exports.findByEmail = async (email) => {
  const query = `
    SELECT id, email, password
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
};

/**
 * Crear nuevo usuario
 */
exports.createUser = async (email, hashedPassword) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email
  `;

  const result = await db.query(query, [email, hashedPassword]);
  return result.rows[0];
};

/**
 * Buscar usuario por ID
 */
exports.findById = async (id) => {
  const query = `
    SELECT id, email
    FROM users
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};
