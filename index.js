'use strict';

var connect = require('connect');
var app = connect();

/**
 * Error handler that shows the stacktrace on the terminal
 * @param  {Function} function error handler
 * @return {null}
 */
app.use(function crashMiddleware(err, req, res, next) {
    console.error(err.stack);
});

/**
 * Mount handler that responses a message
 * @param  {string} '/hello' route
 * @param  {Function} function mount handler
 * @return {null}
 */
app.use('/hello', function helloWorldMiddleware(req, res, next) {
    res.write('¡Hola mundo!\n');
    next();
});

/**
 * Mount handler that response a message and throws an error
 * @param  {string} '/good-bye' route
 * @param  {Function} function  mount handler
 * @return {null}
 */
app.use('/good-bye', function goodByeWorldMiddleware(req, res, next) {
    res.end('¡Adios mundo cruel!\n');
    next(new Error('¡Cuidado con la bomba!'));
});

/**
 * Mount handler that will catch all the requests and responses a message
 * @param  {Function} function mount handler
 * @return {null}
 */
app.use(function signMiddleware(req, res, next) {
    res.end('\n--\nEl Zorro.\n');
    next();
});

/**
 * Starts the application
 * @param  {int} 8080 port
 * @param  {Function} function callback function
 * @return {[type]}          [description]
 */
app.listen(8080, function () {
    console.log('listening on http://localhost:8080/');
});