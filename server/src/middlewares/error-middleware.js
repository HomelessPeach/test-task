const {ApiError} = require("../errors/api.error");

const ErrorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Непредвиденная ошибка!'});
};

module.exports = {ErrorMiddleware};