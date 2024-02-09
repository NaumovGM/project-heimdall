// Сервер для обработки статических данных React проекта
const express = require('express');
const env = require('./config/env');
const path = require('path');

const app = express();
const serverPort = env.serverPort;

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных запросов отправляет index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск Express сервера
app.listen(serverPort, () => {
    console.log(`Сервер запущен на порте ${serverPort}`);
});
