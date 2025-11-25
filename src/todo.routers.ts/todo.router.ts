import { Router } from "express";
import { Todo } from "../types/Todo.js";
import { createTodo, deleteTodoById, listTodo, toggleStatus, updateTodo } from "../todo.services.ts/todo.service.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos
 */

/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 */

// Get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await listTodo();
        res.json({ list: todos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error sending todos" });
    }
});


/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Title or description cannot be empty
 */
// Create new todo
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title и description cannot by empty" });
        }

        const todo: Todo = await createTodo(title.trim(), description.trim());
        return res.status(201).json({ todo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot create todo" });
    }
});


/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated
 *       400:
 *         description: Entity todo cannot be null
 */
// Updat todo
router.put("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        const todo: Todo = req.body;

        if(!todo){
            return res.status(400).json({error: "Entity todo cannot by null"});
        }

        const updatedTodo = await updateTodo(todo, id);

        return res.status(200).json({updatedTodo});
    }catch(err){
        console.log("Error updating todo: ", err);
        res.status(500).json({error: err});
    }
});



/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 */
// Delete to by id
router.delete("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        const deletedTodo = await deleteTodoById(id);
        return res.status(200).json({deletedTodo}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Error delete todo by id"});
    }
});


/**
 * @swagger
 * /api/todo/toggle_status/{id}:
 *   put:
 *     summary: Toggle the status of a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo status toggled
 */
// Toggle status
router.put("/toggle_status/:id", async (req, res,) => {
    try{
        const id = Number(req.params.id);
        const updatedTodo = await toggleStatus(id);
        return res.status(200).json({updatedTodo});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Buy groceries"
 *         description:
 *           type: string
 *           example: "Milk, Bread, Eggs"
 *         createAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-22T10:00:00.000Z"
 *         updateAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-22T12:00:00.000Z"
 *         done:
 *           type: boolean
 *           example: false
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           nullable: true
 */