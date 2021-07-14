var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(todoRoutes);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect("mongodb+srv://adi1234:Adi2810D@cluster0.udvir.mongodb.net/todolist?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}))();
app.get('/', (req, res) => {
    res.send('Application works!');
});
app.listen(PORT, () => console.log(`Server listening in ${process.env.NODE_ENV} On PORT ${PORT}`));
