import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';
import * as dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const mongoUri: string = (process.env.MONGO_URI as string);

(async () => {
  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
})()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json());
app.use(cors());
app.use(todoRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.listen(PORT, () => console.log(`Server listening in ${process.env.NODE_ENV} On PORT ${PORT}`));