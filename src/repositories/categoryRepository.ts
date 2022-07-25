import { prisma } from "../configs/database.js";


export async function getAllCategories(){
    return prisma.category.findMany()
}