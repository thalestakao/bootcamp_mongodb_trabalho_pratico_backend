import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import winston from 'winston';
import accountRouter from './routes/accountRouter.js';

//CONFIGURANDO VARIAVEIS GLOBAIS
dotenv.config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const app = express();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado ao MONGODB');
    app.emit('connected-database');
  });

app.use(express.json());

app.use('/accounts', accountRouter);

app.on('connected-database', () => {
  app.listen(3000, () => {
    console.log('API INICIADA');
  });
});
