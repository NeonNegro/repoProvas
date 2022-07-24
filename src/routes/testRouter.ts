import { Router } from "express";
import { createCard } from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";
import { validadeSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post('/tests', validadeSchemaMiddleware(testSchema), createCard);


export default testRouter;