import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";


const categoryRouter = Router();

categoryRouter.use(ensureAuthenticatedMiddleware);
categoryRouter.get('/categories', getCategories);

export default categoryRouter;