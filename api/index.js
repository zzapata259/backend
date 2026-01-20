const express = require('express');
const router = express.Router();

// ===== MÓDULOS =====
router.use('/auth', require('../modulo-auth/auth.routes'));
router.use('/quiz', require('../modulo-quiz/quiz.routes'));
router.use('/game', require('../modulo-game/game.routes'));

// ===== HEALTH CHECK =====
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    api: 'quiz-api',
    version: '1.0.0'
  });
});

module.exports = router;
