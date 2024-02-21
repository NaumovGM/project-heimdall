// Контроль частых запросов к серверу
import { rateLimit } from 'express-rate-limit';

function configureRateLimiter(maxRequests) {
    return rateLimit({
        windowMs: 60 * 1000, // Время в миллисекундах - как долго хранить записи о запросах в памяти
        max: maxRequests ?? 5, // Максимальное количество запросов за `window` миллисекунд перед отправкой ответа 429
        headers: true, // Отправлять пользовательский заголовок ограничения с лимитом и оставшимися запросами
        skipFailedRequests: false, // Не учитывать неудачные запросы (статус >= 400)
        skipSuccessfulRequests: false, // Не учитывать успешные запросы (статус < 400)
        handler: function (req, res) {
            res.status(429).json({ message: 'Слишком много запросов' }); // Отправляем ответ клиенту
        },
    });
}

export default configureRateLimiter;
