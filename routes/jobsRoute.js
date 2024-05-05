import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controllers/jobsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: APIs for managing jobs
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - location
 *      properties:
 *        title:
 *          type: string
 *          description: Job title
 *          example: Software Engineer
 *        description:
 *          type: string
 *          description: Job description
 *          example: We are looking for a skilled software engineer...
 *        location:
 *          type: string
 *          description: Job location (city or country)
 *          example: India
 */

/**
 * @swagger
 * /api/v1/jobs/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 */

// CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/jobs/get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 */

// GET JOBS || GET
router.get("/get-job", userAuth, getAllJobsController);

// Other routes and Swagger documentation for update-job, delete-job, and job-stats routes can be added similarly

export default router;
