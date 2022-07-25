import { prisma } from "../configs/database.js";



export async function getDisciplinesByTeacherId(id: number){
    return prisma.discipline.findMany({
        where:{ id }
    })
}