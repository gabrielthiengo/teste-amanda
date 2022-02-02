import "reflect-metadata";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';

import { errorMiddleware } from './middlewares/errorMiddleware';
import swaggerDocs from './swagger.json';

import './database';
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/v1', routes);
app.use(errorMiddleware);

app.listen(3000, () => logger.info('Server is running'));