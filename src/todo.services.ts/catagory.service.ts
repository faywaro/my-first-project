import { prisma } from "../db/prisma_db.js";
import { Category } from "../types/Category.js";
import { Todo } from "../types/Todo.js";

// Add new category (without todos)
export async function createCategory(name: Category["name"]) {
    return prisma.categories.create({
        data: {
            name: name
        }
    });
};

// Delete category by name
export async function deleteCategoryByName(name: Category["name"]) {
    const deletingCategory = await prisma.categories.findUnique({where: {name}});
    if(!deletingCategory) return null;

    await prisma.categories.delete({where: {name}});
    return deletingCategory;
}
// Delete category by id
export async function deleteCategoryById(id: Category["id"]) {
    const deletingCategory = await prisma.categories.findUnique({where: {id}});
    if(!deletingCategory) return null;

    await prisma.categories.delete({where: {id}});
    return deletingCategory;
}

// Get all categories
export async function listCategories() {
    return prisma.categories.findMany({include: {todos: true}});
}

// Add todo or todos in category
export async function addTodosInCategory(
    categoryId: Category["id"],
    todoIds: Todo["id"][]
): Promise<Todo[]> {

    await prisma.categories.update({
        where: { id: categoryId },
        data: {
            todos: { connect: todoIds.map(id => ({ id })) }
        }
    });

    return prisma.todos.findMany({
        where: { id: { in: todoIds } },
        include: { categories: true }
    });
}

// Detele todo or todos in category 
export async function deleteTodosInCategory(categoryId: Category["id"], todoIds: Todo["id"][]) {
    await prisma.categories.update({
        where: { id: categoryId },
        data: {
            todos: { disconnect: todoIds.map(id => ({ id: id })) }
        }
    });

    return prisma.todos.findMany({
        where: { id: { in: todoIds } },
        include: { categories: true }
    });
}

// Change category name 
export async function changeCategoryName(newName: Category["name"], id: Category["id"]) {
    const updatedcategory = await prisma.categories.update({
        where: {id: id},
        data: {name: newName}
    });

    return updatedcategory;
}

// Get category by id
export async function getCategoryById(id: Category["id"]) {
    const searchedCategory = await prisma.categories.findUnique({
        where: {id: id}, 
        include: { todos: true }
    }); 
    return searchedCategory;
}
