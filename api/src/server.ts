import express from 'express';
import config from './config/config';
import userRoute from './users/UserRoute';

const app = express();
app.use(express.json());

app.use('/api/users', userRoute );

app.listen(config.port, () =>{
    console.log(`O servidor está rodando na porta: ${config.port}`);
});