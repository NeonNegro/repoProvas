import { Test, User } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";
import * as disciplineRepository from '../repositories/disciplineRepository.js';


export type CreateTestData = Omit<Test, 'id'>;

export interface TestsFilter {
    groupBy: 'disciplines' | 'teachers';
}


async function createTest(test: CreateTestData){
    await testRepository.insertTest(test);
}

async function getTests(filter: TestsFilter){
    let tests;
    if(filter.groupBy === 'disciplines'){
        tests = await testRepository.getTestsByDiscipline();
    }
    if(filter.groupBy === 'teachers'){
        tests = await testRepository.getTestsByTeacher();
        //tests = ConstructTestObject(rawTests);

    }
        
        //console.log(tests.tests);
    //     tests.forEach(async t =>{
    //         const disciplines = await disciplineRepository.getDisciplinesByTeacherId(t.teacher.id);
    //         // console.log(disciplines);
    //         // console.log('   ');
    //         t.discipline = [];
    //         t.discipline.push(disciplines);
    //     }); 
    // }
    // tests.forEach(t =>{
    //     console.log(t);
    // })
    console.log(tests);
    return tests;
}


// function ConstructTestObject(tests){
//     const re = [];
//     console.log(typeof tests);
//     tests.forEach(t =>{
//         const tests = [];
//         const disciplines= [];
//         const discipline = {};
//         const category = {id: t.categoryId, name: t.categoryName};
//         tests.push({
//             test: t.testName, 
//             pdfUrl: t.pdfUrl,
//             category,
//         })
//         disciplines.push({name: t.disciplineName, id: t.disciplineId});
//         const object = {
//             teacher: {
//                 name: t.teacherName,
//             },
//             tests,
//             disciplines,
//             discipline            

//         }
//         re.push(object);
//     })

//     return re;
// }


const testService = {
    createTest,
    getTests,
}

export default testService;