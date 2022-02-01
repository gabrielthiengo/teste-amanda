import "reflect-metadata";
import express from 'express';

const bodyParser = require('body-parser');

import './database';
import { routes } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => console.log('Server is running'));