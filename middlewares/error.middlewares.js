const errorHandler = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            status: 'fail',
            message: 'גוף הבקשה חייב להיות JSON תקין. ב-Postman בחרו Body → raw → JSON, והעבירו קוד pm.test ללשונית Tests.'
        });
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
};

export default errorHandler;