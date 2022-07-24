import { Request, Response} from "express"
import testService from "../services/testService.js";


export async function createCard(req: Request, res: Response){
    const test =  req.body;

    await testService.createTest(test);
    res.sendStatus(201);
}