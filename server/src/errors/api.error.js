class ApiError extends Error {

    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static NotFound(message) {
        return new ApiError(404, message);
    }

    static NotAllowed(message) {
        return new ApiError(405, message);
    }

    static NoContent(message) {
        return new ApiError(204, message);
    }
}

module.exports = {ApiError};