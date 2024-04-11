const httpStatus={
    NOT_FOUND:404,
    BAD_REQUEST:400,
    INTERNAL_API_ERROR:500,
    SUCCESS:200,
    CREATED:201,
    UNAUTHORIZED:401
}

const errorMessages={
    NOT_FOUND: "The resources could not be found",
    BAD_REQUEST: "Oops! bad request",
    INTERNAL_API_ERROR: "An internal server error occurred",
    SUCCESS: function (message) {
        return `The resource was successfully ${message}`
    },
    CREATED: "The resources was successfully created",
    UNAUTHORIZED: "Oop! you are not authorized to access these resource",
}

module.exports={
    httpStatus,
    errorMessages
}