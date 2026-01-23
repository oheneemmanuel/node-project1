const router = require('express').Router();
const moviesRoutes = require('./movies');
router.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

router.use('/movies', moviesRoutes);
module.exports = router