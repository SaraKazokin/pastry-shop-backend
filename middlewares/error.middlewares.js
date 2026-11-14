import AppError from "../utils/AppError";

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === 'CastError') {
        const message = 'Invalid ${error.path}: ${error.value}.';
        error = new AppError(message, 400);
    }

    if (error.code = 11000) {
        const value = error.errmsg ? error.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'Duplicate value';
        const message = 'Duplicate field value: ${value}. Please use another value!'
        error = new AppError(message, 400)
    }

    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(el => el.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        error = new AppError(message, 400);
    }

    if (error.type === 'entity.parse.failed') {
        error = new AppError('Invalid JSON format in the request body.', 400);
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        //For development environment only
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default errorHandler;