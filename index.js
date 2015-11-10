'use strict';

var connect = require('connect');
var app = connect();

/**
 * Error handler that shows the stacktrace on the terminal
 * @param  {Error} err error object
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function crash(err, req, res, next) {
    console.error('This error handler is actually being call');
    console.error(err.stack);
};

/**
 * Handler able to replace the request url if original request points to '/bad'
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function bigBrother(req, res, next) {
    console.log('big brother watches over you.');
    if (req.url == '/bad') {
        console.log('and makes sure you use doublespeak')
        req.url = '/ungood';
    }
    next();
};

/**
 * Handler that prints a message in the console
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function bad(req, res, next) {
    console.log('big brother has forbidden this path.');
};

/**
 * Handler that prints a message and responds another message
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function ungood(req, res, next){
    console.log('double spoken like a double plus good citizen.');
    res.end('double plus ungood!');
};


/**
 * Handler that responses a message
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function helloWorld(req, res, next) {
    res.write('¡Hola mundo!\n');
    next();
};

/**
 * Handler that response a message and throws an error
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function goodByeWorld(req, res, next) {
    res.end('¡Adios mundo cruel!\n');
    next(new Error('¡Cuidado con la bomba!'));
};

/**
 * Handler that response a message
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function zorroArrives(req, res, next) {
    console.log('El Zorro arrives on the scene and saves the day!');
    next();
};

/**
 * Handler that will catch all the requests and responses a message
 * @param {http.ClientRequest} req request object
 * @param {http.ServerResponse} res response object
 * @param {Function} next function that will call the next middleware in the stack
 * @return {null}
 */
function sign(req, res, next) {
    res.end('\n--\nEl Zorro.\n');
    next();
};

app.use(bigBrother);
app.use('/bad', bad);
app.use('/ungood', ungood);
app.use('/hello', helloWorld);
app.use('/good-bye', goodByeWorld);
app.use(zorroArrives);
app.use(sign);
app.use(crash);

/**
 * Starts the application
 * @param  {int} 8080 port
 * @param  {Function} function callback function
 * @return {[type]}          [description]
 */
app.listen(8080, function () {
    console.log('listening on http://localhost:8080/');
});
