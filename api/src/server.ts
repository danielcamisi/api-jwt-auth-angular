import express from 'express';
import config from './config/config';
import userRoute from './users/UserRoute';
import db from './config/db';


const app = express();
app.use(express.json());

db();

app.use('/api/users',userRoute);

app.listen(config.port, () =>{
    console.log(`O servidor está rodando na porta: ${config.port}`);
});