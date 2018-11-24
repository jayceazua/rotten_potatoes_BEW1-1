const movieRouter = require('express').Router();
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('b91882fe5794937e9c6d9b8a190cf759');

// INDEX
movieRouter.get('/movies', (req, res) => {
    moviedb.miscNowPlayingMovies().then((data) => {
        res.render('movies/index', {
            movies: data.results
        });
    }).catch(e => res.send(e.message))
});
// SHOW
movieRouter.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id})
        .then((movie) => {
            moviedb.movieTrailers({id: req.params.id})
                .then((videos) => {
                    movie.trailer_youtube_id = videos.youtube[0].source
                    console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id)

                    res.render('movies/show', {movie})
                })
                .catch(e => res.send(e.message))
        })
        .catch(e => res.send(e.message))
});




module.exports = movieRouter;
