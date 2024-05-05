import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;
    // Validate
    if (!name) {
        next("Name is required");
    }
    if (!email) {
        next("Email is required");
    }
    if (!password) {
        next("Password is required and must be greater than 6 characters");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        next("Email is already registered. Please login.");
    }
    const user = await userModel.create({ name, email, password });
    // Generate token
    const token = user.createJWT();
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
    });
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
        next("Please provide all fields");
    }
    // Find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        next("Invalid username or password");
    }
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next("Invalid username or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
    });
};
