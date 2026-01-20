const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};
