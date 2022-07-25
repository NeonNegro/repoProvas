import { Test, User } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";


export type CreateTestData = Omit<Test, 'id'>;

export interface TestsFilter {
    groupBy: 'disciplines' | 'teachers';
}


async function createTest(test: CreateTestData){
    await testRepository.insertTest(test);
}

async function getTests(filter: TestsFilter){
    const tests = await testRepository.getTestsByDiscipline();
    console.log(tests);
    return tests;
}



const testService = {
    createTest,
    getTests,
}

export default testService;