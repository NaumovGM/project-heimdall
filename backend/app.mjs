// Главный файл приложения
import express from 'express';
import env from './config/env.mjs';
import middlewares from './middlewares/index.mjs';
import WebPush from './utils/webPush.mjs';

// Инициализация Express
const app = express();
const serverPort = env.serverPort;

// Подключение middlewares
middlewares.setupDatabase();
middlewares.setupCors(app);
middlewares.setupSecurityHeaders(app);
middlewares.setupFrontend(app);
middlewares.setupJsonParser(app);
middlewares.setupUrlEncodedParser(app);
middlewares.setupRequestId(app);
middlewares.setupRoutes(app);
middlewares.setupNotFound(app);
middlewares.setupError(app);

// Подключение дополнительных модулей
WebPush.setupWebPush();

// Регистрация подписки на уведомления
app.post('/api/subscribe', (req, res) => {
    console.log(req.body);
    subscription = req.body;
    console.log(subscription);
    // Сохраните подписку в базе данных или в памяти
    res.status(201).json({}); // Отправляем ответ клиенту
});

// Регистрация подписки на уведомления
app.get('/api/send', (req, res) => {
    const notificationData = {
        title: 'Новое уведомление',
        body: 'Вы получили новое уведомление от нашего сервиса!',
        icon: '/path/to/icon.png',
        data: {
            id: 123,
            link: 'https://example.com/notification',
        },
    };
    sendNotification(subscription, notificationData);
    res.status(201).json({}); // Отправляем ответ клиенту
});

// Получение ответа, что пользователь получил
app.post('/api/notificationReceived', (req, res) => {
    console.log('Пуш получен');
    res.status(201).json({}); // Отправляем ответ клиенту
});

// Отправка push-уведомления
function sendNotification(subscription, dataToSend) {
    console.log('Пуш отправлен');
    webpush.sendNotification(subscription, JSON.stringify(dataToSend)).catch((err) => console.error('Error sending notification:', err));
}

// Запуск сервера
app.listen(serverPort, () => {
    console.log(`Сервер запущен на порту - ${serverPort}`);
});
