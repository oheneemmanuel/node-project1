const router = require('express').Router();
const moviesRoutes = require('./movies');
const swaggerRoutes = require('./swagger');

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

router.use('/movies', moviesRoutes);
router.use('/directors', require('./directors'));
router.use('/', swaggerRoutes);
module.exports = router