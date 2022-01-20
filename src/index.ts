import express, { Application, NextFunction, Response, Request } from 'express';
import { HttpError } from '../models/http-error';
import imageRouter from '../routes/image-routes';

const app: Application = express();

const port: Number = 3000;

app.use(imageRouter);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
