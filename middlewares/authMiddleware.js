import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new Error("Authentication failed: Missing or invalid token."));
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const payload = JWT.verify(token, process.env.JWT_SECRET);

        // Attach the user ID from the token to the request object
        req.user = { userId: payload.userId };

        next();
    } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error.message);
        return next(new Error("Authentication failed: Invalid token."));
    }
};

export default userAuth;
