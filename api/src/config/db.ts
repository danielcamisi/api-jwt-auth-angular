import mongoose from 'mongoose';
import config from './config';

const db = async () => {
    await mongoose.connect(config.mongoUrl as string).then(() =>{
        console.log('O Banco de Dados foi conectado com sucesso');
    }).catch((error) =>{ 
        console.error("Houve um erro ao conectar com o banco de dados",error)
    });
}

export default db;