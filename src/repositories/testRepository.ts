import { prisma } from "../configs/database.js";
import { CreateTestData } from "../services/testService.js";


export async function insertTest(test: CreateTestData){
    return prisma.test.create({
        data: test
    })
}

export async function getTestsByDiscipline(){
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include:{
                                    category: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

export async function getTestsByTeacher(){
    return prisma.teacherDiscipline.findMany({
        include:{
            teacher: true,
            discipline: {
                include:{
                    term: true
                }
            }
        }
    })
}

// export async function getTestsByTeacher(){
//     const result =  await prisma.$queryRaw`
//     SELECT td.*, t.name AS "teacherName", tests.name AS "testName", 
//     tests."pdfUrl", d.name as "disciplineName", d.id AS "disciplineId",
//     c.name AS "categoryName", c.id AS "categoryId"
//     FROM "teachersDisciplines" AS td
//     JOIN disciplines AS d ON td."disciplineId"=d.id
//     JOIN teachers AS t ON td."teacherId"=t.id
//     JOIN tests ON tests.id=t.id
//     JOIN categories AS c ON tests."categoryId"=c.id
//     `;
//     return result;
//     // return prisma.teacherDiscipline.findMany({
//     //     include:{
//     //         teacher: true,
//     //         tests: {
//     //             include:{
//     //                 category: true,
//     //             }
//     //         }
//     //     }
//     // });
// }