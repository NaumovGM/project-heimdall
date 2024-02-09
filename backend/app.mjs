// Главный файл приложения
import express from 'express';
import env from './config/env.mjs';
import helmet from 'helmet';
import cors from 'cors';

// Инициализация Express
const app = express();
const serverPort = env.serverPort;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый маршрут
app.get('/api/data', (req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
});

// Запуск сервера
app.listen(serverPort, () => {
    console.log(`Сервер запущен на порте ${serverPort}`);
});
