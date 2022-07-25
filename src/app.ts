import express, {json} from 'express';
import handleErrorsMiddleware from './middlewares/handleErrorsMiddleware.js';
import router from './routes/index.js';
import 'express-async-errors';



const app = express();
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;