import { Router } from "express";
import { validadeSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";
import {signIn, signUp} from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validadeSchemaMiddleware(userSchema), signUp);
authRouter.post("/signin", validadeSchemaMiddleware(userSchema), signIn);

export default authRouter;