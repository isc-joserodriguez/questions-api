let router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`
  <h1>Welcome to Api-Questions</h1>
  <a href="https://github.com/isc-joserodriguez/api-questions">Repo</a>
  `);
});

//Se ponen disponibles las rutas de nuestros endpoint
router.use('/user', require('./User.router'));
router.use('/question', require('./Question.router'));

module.exports = router;