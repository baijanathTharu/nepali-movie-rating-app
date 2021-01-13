const router = require('express').Router();

const movieRoute = require('../modules/movies/movie.route');
const userRoute = require('../modules/users/user.route');
const authRoute = require('../modules/users/auth/auth.route');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const ratingRoute = require('../modules/movies/rating.route');
const searchMovies = require('../modules/movies/movie.search');
const checkActive = require('../middlewares/checkActive');
const checkInActive = require('../middlewares/checkInActive');
const verifyEmail = require('../middlewares/verifyEmail');

router.use('/movies', authenticate, authorize, movieRoute);
router.use('/rate', authenticate, checkActive, ratingRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/search/movies', searchMovies);
router.use('/verify-email/:userId/:code', checkInActive, verifyEmail);

module.exports = router;
