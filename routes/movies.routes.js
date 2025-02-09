// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

router.get("/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebrities });
        })
        .catch(err => {
            next(err);
        });
});

router.post("/create", (req, res, next) => {
    const { title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
        .then(movie => {
            res.redirect('/movies');
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error al crear la pelicula");
        });
});

router.get("/", (req, res, next) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies.hbs", { movies });
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error al listar movies", err);
        });
});


router.get('/:id',(req,res,next)=>{
    const { id } = req.params;
    Movie.findById(id)
        .populate('cast','name occupation catchPhrase')
        .then(movie => {
            console.log('Movie',movie);
            res.render('movies/movie-details',{movie});
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error");
        });
});

// DELETE
router.post('/:id/delete',(req,res,next)=>{
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then(movie => {
            res.redirect('/movies');
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error");
        });
});

router.get('/:id/edit',(req,res,next)=>{
    const { id } = req.params;
    Movie.findById(id)
        .populate('cast','name occupation catchPhrase')
        .then(movie => {
            console.log('Movie',movie);
            res.render('movies/edit-movie',{movie});
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error");
        });
});

router.post('/:id/edit',(req,res,next)=>{
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id,{title, genre, plot, cast})
        .then(movie => {
            res.redirect('/movies');
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error");
        });
});

module.exports = router;