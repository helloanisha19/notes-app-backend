import { Router } from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import authenticator from "../middlewares/authenticator.js";

const noteRouter = Router();
noteRouter.use(authenticator);

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Operations related to notes
 */

/**
 * @swagger
 * /note:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   user:
 *                     type: string
 *       401:
 *         description: Invalid or expired token
 */
noteRouter.get("/", getAllNotes);

/**
 * @swagger
 * /note/create:
 *   post:
 *     summary: Create a new note for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Invalid or expired token
 */
noteRouter.post("/create", createNote);

/**
 * @swagger
 * /note/{id}:
 *   patch:
 *     summary: Update an existing note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Bad request or validation error
 *       404:
 *         description: Note not found
 *       401:
 *         description: Invalid or expired token
 */
noteRouter.patch("/:id", updateNote);

/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Invalid or expired token
 */
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
