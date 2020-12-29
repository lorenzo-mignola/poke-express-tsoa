import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from '../dist/routes';
import swaggerConfig from '../dist/swagger.json';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use('/docs', swaggerUI.serve, (_req: Request, res: Response) => {
  return res.send(swaggerUI.generateHTML(swaggerConfig));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
  return undefined;
});

app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({
    message: 'Not Found',
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started at http://loclahost:${port}`);
});
