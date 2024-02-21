// Middleware для работы с basic авторизацией Grafana
import env from '../../config/env.mjs';

function checkAccessGrafana(req, res, next) {
    try {
        const grafanaUsername = env.grafanaUsername;
        const grafanaPassword = env.grafanaPassword;
        const authHeader = req.header('Authorization');
        // Проверка наличия заголовка авторизации
        if (!authHeader) {
            throw Error;
        }

        // Получение username и password
        const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        // Сравнение пользователя и пароля с конфигурационным файлом
        if (grafanaUsername == credentials[0] && grafanaPassword == credentials[1]) {
            next();
        } else {
            throw Error;
        }
    } catch (error) {
        res.status(404).json({ status: false, message: 'Запрашиваемая страница не найдена' });
    }
}

export default checkAccessGrafana;
