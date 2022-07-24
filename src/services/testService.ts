import { Test, User } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";


export type CreateTestData = Omit<Test, 'id'>;


async function createTest(test: CreateTestData){
    await testRepository.insertTest(test);
}



const testService = {
    createTest,
}

export default testService;