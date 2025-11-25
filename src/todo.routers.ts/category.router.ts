import { Router } from "express";
import {
  addTodosInCategory,
  changeCategoryName,
  createCategory,
  deleteCategoryById,
  deleteCategoryByName,
  listCategories,
  getCategoryById,
  deleteTodosInCategory
} from "../todo.services.ts/catagory.service.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing todo categories
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 */
// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await listCategories();
    res.status(200).json({ list: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching categories" });
  }
});

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
// Get category by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching category by id" });
  }
});

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Name cannot be empty
 */
// Create new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name cannot be empty" });

    const category = await createCategory(name.trim());
    res.status(201).json({ category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot create category" });
  }
});

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
// Delete category by id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedCategory = await deleteCategoryById(id);
    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ deletedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting category by id" });
  }
});


/**
 * @swagger
 * /api/category/name/{name}:
 *   delete:
 *     summary: Delete category by name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
// Delete category by name
router.delete("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deletedCategory = await deleteCategoryByName(name);
    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ deletedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting category by name" });
  }
});


/**
 * @swagger
 * /api/category/changeName/{id}:
 *   put:
 *     summary: Change category name
 *     tags: [Categories]
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Name cannot be empty
 */
// Change category name
router.put("/changeName/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name cannot be empty" });

    const updatedCategory = await changeCategoryName(name, id);
    res.status(200).json({ updatedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error changing category name" });
  }
});

/**
 * @swagger
 * /api/category/{id}/addTodos:
 *   put:
 *     summary: Add todos to category
 *     tags: [Categories]
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
 *             type: object
 *             properties:
 *               todoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Todos added
 *       400:
 *         description: Invalid input
 */
// Add todos to category
router.put("/:id/addTodos", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { todoIds } = req.body;
    if (!todoIds) return res.status(400).json({ error: "todoIds must be an array" });

    const todos = await addTodosInCategory(id, todoIds);
    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding todos to category" });
  }
});

/**
 * @swagger
 * /api/category/{id}/deleteTodos:
 *   put:
 *     summary: Delete todos from category
 *     tags: [Categories]
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
 *             type: object
 *             properties:
 *               todoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Todos deleted
 *       400:
 *         description: Invalid input
 */
// Delete todos from category
router.put("/:id/deleteTodos", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { todoIds } = req.body;
    if (!todoIds) return res.status(400).json({ error: "todoIds must be an array" });

    const todos = await deleteTodosInCategory(id, todoIds);
    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error removing todos from category" });
  }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Work"
 *         todos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Todo'
 *           nullable: true
 */