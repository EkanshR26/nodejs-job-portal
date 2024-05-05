import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs for user management
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       500:
 *         description: Internal server error
 */

router.put("/update-user", userAuth, updateUserController);

export default router;
