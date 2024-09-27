import express from 'express';
import config from './config/config';

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    res.json({message:'a aplicação rodou corretamente'});
});

app.listen(config.port, () =>{
    console.log(`O servidor está rodando na porta: ${config.port}`);
});