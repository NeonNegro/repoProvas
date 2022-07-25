import { Request, Response} from "express"
import testService, { TestsFilter } from "../services/testService.js";


export async function createTest(req: Request, res: Response){
    const test =  req.body;

    await testService.createTest(test);
    res.sendStatus(201);
}

export async function getTests(req: Request, res: Response){
    const filter = { groupBy: req.query.groupBy } as TestsFilter;


    const tests = await testService.getTests(filter);

    res.send(tests);
}






// async function getTestsByDiscipline(token: string) {
//     const config = getConfig(token);
//     return baseAPI.get<{ tests: TestByDiscipline[] }>(
//       "/tests?groupBy=disciplines",
//       config
//     );
//   }
  
//   async function getTestsByTeacher(token: string) {
//     const config = getConfig(token);
//     return baseAPI.get<{ tests: TestByTeacher[] }>(
//       "/tests?groupBy=teachers",
//       config
//     );
//   }