import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";


export async function getCategories(req: Request, res: Response){
    const categories = await categoryService.getCategories();

    res.send(categories);
}