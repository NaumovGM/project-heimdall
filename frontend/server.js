const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных запросов отправляет index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск Express сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});
