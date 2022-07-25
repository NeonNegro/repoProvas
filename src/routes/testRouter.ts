import { Router } from "express";
import { createTest, getTests } from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";
import { validadeSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post('/tests', validadeSchemaMiddleware(testSchema), createTest);
testRouter.get('/tests', getTests);


export default testRouter;