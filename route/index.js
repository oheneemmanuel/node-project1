const router = require('express').Router();
const moviesRoutes = require('./movies');
const swaggerRoutes = require('./swagger');
const authRoutes = require('./authRoute');
const userRoutes = require('./user');

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

router.use('/movies', moviesRoutes);
router.use('/users', userRoutes);
router.use('/directors', require('./directors'));
router.use('/', swaggerRoutes);
router.use('/auth', authRoutes);
module.exports = router