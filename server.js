// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/batepapo'); // connect to our database

app.use(express.static(__dirname + '/public'));


//required
var Mensagem        = require('./app/models/mensagem');
var Usuario        = require('./app/models/usuario');


// configure app to use bodyParser()
// this will let us get the data from a POST
//// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/mensagem')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var msg = new Mensagem();      // create a new instance of the Bear model
        msg.remetente    = req.body.remetente;
        msg.destinatario = req.body.destinatario;
        msg.msg          = req.body.msg;

        // save the bear and check for errors
        msg.save(function(err) {
            if (err)
                res.send(err);

            res.json(msg);
        });
        
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Mensagem.find(function(err, msgs) {
            if (err)
                res.send(err);

            res.json(msgs);
        });
    });




    /**
    * ROTA DE USUARIOS
    */

    router.route('/usuarios')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var usuario = new Usuario();      // create a new instance of the Bear model
        usuario.nome = req.body.nome;  
        usuario.email = req.body.email;  
        usuario.senha = req.body.senha;  

        // save the bear and check for errors
        usuario.save(function(err) {
            if (err)
                res.send(err);

            res.json(usuario);
        });
        
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Usuario.query(req.query, function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

    router.route('/usuarios/:user_id')

    .get(function(req, res){
        Usuario.findById(req.params.user_id, function(err, user) {
            res.json(user);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Usuario.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.nome  = req.body.nome;
            user.email = req.body.email;
            user.senha = req.body.senha;


            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json(user);
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Usuario.remove({
            _id: req.params.user_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json(true);
        });
    });

// all of our routes will be prefixed with /api
app.use('/api', router);


// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);