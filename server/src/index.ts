import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import pokemon from './routes/pokemon';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT || 3001;

app.use('/pokemon', pokemon);

app.listen(port, () => {
  console.log(`Server started at http://loclahost:${port}`);
});
