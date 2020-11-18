import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors()) // Precisa caso estiver fazendo aplicação no browser, para setar a aplicação que vai consumir por segurança
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // Verifica se o erro foi originado pela aplicação
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});


app.listen(3333, () => {
    console.log("Iniciou")
});
