const {contacts}= require('../constants');

const errorHandler = (err, req, res, next)=>
{
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch(statusCode) {
        case contacts.VALIDATION_ERROR:
          res.json({
            title: "Validation Failed",
            message: err.message, 
            stackTrace: err.stack,
        })
        break;
        case contacts.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            })
            // break;
        case contacts.UNAUTHORIZED:
            res.json({
                title: "Unauthoriezed",
                message: err.message,
                stackTrace: err.stack
            })
            // break;
        case contacts.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            })
            // break;
        case contacts.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            })
            // break;
        default:
            console.log('No error, All good!');
            break;
    }
}

module.exports = errorHandler;