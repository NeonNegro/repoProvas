import { prisma } from "../configs/database.js";
import { CreateTestData } from "../services/testService.js";


export async function insertTest(test: CreateTestData){
    return prisma.test.create({
        data: test
    })
}

// export async function getTestsByDiscipline(){
//     return prisma.test.findMany();
// }

export async function getTestsByDiscipline(){
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    TeacherDiscipline: {
                        include: {
                            teacher: true
                        }
                    }
                }
            }
        }
    });
}

export async function getTestsByTeacher(){
    return prisma.term.findMany({});
}