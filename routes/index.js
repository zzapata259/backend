const express = require('express');
const router = express.Router();

router.use('/auth', require('../modulo-auth/auth.routes'));
router.use('/quiz', require('../modulo-quiz/quiz.routes'));

router.get('/', (req, res) => {
  res.json({ message: 'API funcionando ✅' });
});

module.exports = router;
