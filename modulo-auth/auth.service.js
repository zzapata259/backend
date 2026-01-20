const bcrypt = require('bcrypt');
const userModel = require('./auth.model');
const jwt = require('../utils/jwt');

/**
 * REGISTRO
 */

exports.registrar = async ({ email, password }) => {

  if (!email || !password) {
    const error = new Error('Email y password son obligatorios');
    error.status = 400;
    throw error;
  }

  const existe = await userModel.findByEmail(email);

  if (existe) {
    const error = new Error('El usuario ya existe');
    error.status = 409;
    throw error;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.createUser(email, hash);

  return {
    mensaje: 'Usuario registrado correctamente',
    usuario: user
  };
};



/**
 * LOGIN
 */
exports.login = async ({ email, password }) => {

  if (!email || !password) {
    const error = new Error('Datos obligatorios');
    error.status = 400;
    throw error;
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const token = jwt.generateToken({
    id: user.id,
    email: user.email
  });

  return {
    mensaje: 'Login correcto',
    token
  };
};
