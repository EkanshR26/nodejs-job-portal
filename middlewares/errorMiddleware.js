// Error middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
    // Log the error (sanitize or remove sensitive information before logging in production)
    console.error("Error:", err);

    // Default error response
    let defaultError = {
        statusCode: 500,
        message: "Internal server error.",
    };

    // Handle specific error types
    if (err.name === "ValidationError") {
        defaultError.statusCode = 400;
        defaultError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    } else if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.message = "Duplicate field value entered.";
    }

    // Send the error response
    res.status(defaultError.statusCode).json({ error: defaultError.message });
};

export default errorMiddleware;
