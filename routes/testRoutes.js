import express from 'express';
import { testPostController } from "./../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: APIs for testing purposes
 */

/**
 * @swagger
 * /api/v1/test/test-post:
 *   post:
 *     summary: Test endpoint for POST requests
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

router.post("/test-post", userAuth, testPostController);

export default router;
