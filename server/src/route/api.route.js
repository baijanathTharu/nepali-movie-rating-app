const router = require('express').Router();

const movieRoute = require('../modules/movies/movie.route');
const userRoute = require('../modules/users/user.route');
const authRoute = require('../modules/users/auth/auth.route');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const ratingRoute = require('../modules/movies/rating.route');
const searchMovies = require('../modules/movies/movie.search');

router.use('/movies', authenticate, authorize, movieRoute);
router.use('/rate', authenticate, ratingRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/search/movies', searchMovies);

module.exports = router;
