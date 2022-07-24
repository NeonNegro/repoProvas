import { prisma } from "../configs/database.js";
import { CreateTestData } from "../services/testService.js";


export async function insertTest(test: CreateTestData){
    return prisma.test.create({
        data: test
    })
}