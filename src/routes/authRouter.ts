import { Router } from "express";
import { validadeSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";
import {signIn, signUp} from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", validadeSchemaMiddleware(userSchema), signUp);
authRouter.post("/sign-in", validadeSchemaMiddleware(userSchema), signIn);

export default authRouter;