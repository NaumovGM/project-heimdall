// Middleware для работы с basic авторизацией Grafana
import env from '../../config/env.mjs';
import config from '../../config/config.mjs';

function checkAccessGrafana(req, res, next) {
    try {
        // Проверка является ли URL разрешенным
        if (!config.ALLOWED_URLS_DEBUG.grafana.includes(req.connection.remoteAddress)) {
            throw Error;
        }
        const authHeader = req.header('Authorization');

        // Проверка наличия заголовка авторизации
        if (!authHeader) {
            throw Error;
        }

        // Получение username и password
        const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        // Сравнение пользователя и пароля с конфигурационным файлом
        if (env.grafanaUsername == credentials[0] && env.grafanaPassword == credentials[1]) {
            next();
        } else {
            throw Error;
        }
    } catch (error) {
        // Отправка 404 для сохранения безопасности ответов
        res.status(404).json({ status: false, message: 'Запрашиваемая страница не найдена' });
    }
}

export default checkAccessGrafana;
