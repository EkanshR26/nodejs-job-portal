import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, email, lastName, location } = req.body;
    const userId = req.user.userId; // Assuming userId is obtained from authentication middleware

    try {
        // Check if all fields are provided
        if (!name || !email || !lastName || !location) {
            return res.status(400).json({ success: false, message: "Please provide all fields." });
        }

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the user is authorized to update the profile
        if (user._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this user's profile." });
        }

        // Update user's information
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.location = location;

        // Save updated user
        await user.save();

        // Generate token
        const token = user.createJWT();

        // Send response
        res.status(200).json({
            success: true,
            message: "User profile updated successfully.",
            user,
            token,
        });
    } catch (error) {
        // Handle errors
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
