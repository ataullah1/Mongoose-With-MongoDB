import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// parser-----------
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 🎋!');
});

app.use(globalErrorHandler);

// Not Foutnd
app.use(notFound);

export default app;
