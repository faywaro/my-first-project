import { Todo } from "../types/Todo.js";
import { prisma } from "../db/prisma_db.js";

// Create new todo
export async function createTodo(title: Todo["title"], description: Todo["description"]) : Promise<Todo>{
    return prisma.todos.create({
        data: {
            title,
            description,
        }
    });
}

// Get all todos from db
export async function listTodo(){
    return prisma.todos.findMany();
}

// Delete todo by id
export async function deleteTodoById(id: number) : Promise<Todo|null>{
    const deletingTodo = await prisma.todos.findUnique({where: {id}});
    if(!deletingTodo) return null;

    await prisma.todos.delete({where: {id}});

    return deletingTodo;
}

// Update todo
export async function updateTodo(todo: Todo, id: number) : Promise<Todo | null>{
    const updatingTodo = await prisma.todos.findUnique({where: {id}});
    if(!updatingTodo) return null;

    const updatedTodo = await prisma.todos.update({
        where: {id: id},
        data: {
            title: todo.title,
            description: todo.description,
            done: todo.done
        }
    });

    return updatedTodo;
}

// Toggle status(done)
export async function toggleStatus(id: number) : Promise<Todo | null>{
    const todo = await prisma.todos.findUnique({where: {id}});
    if(!todo) return null;
    
    const updatedTodo = await prisma.todos.update({
        where: {id},
        data: {
            done: !todo.done,
        }
    });

    return updatedTodo;
}

// Get todo by id
export async function getTodoById(id: Todo["id"]) {
    const searchedTodo = await prisma.todos.findUnique({where: {id: id}});
    return searchedTodo;
}