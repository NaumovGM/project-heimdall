import logger from './logger.mjs';

class Response {
    success(req, res, data, code = 200) {
        const profile = req.profile ? req.profile.id : 'GUEST';
        // Тело ответа
        const result = {
            status: true,
            data: typeof data === 'string' ? { message: data } : data,
        };

        // Отдаем ответ, чтобы не ждать обработки записи в лог файл
        res.status(code).json(result);

        // Логирование успешного ответа пользователю
        logger.info({ result }, `[OUT] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`);
    }

    failure(req, res, data, err = null) {
        const profile = req.profile ? req.profile.id : 'GUEST';
        const message = data;
        const code = 200;
        if (err) {
            message = err instanceof Error ? err.message : 'Ошибка сервера';
            code = err instanceof Error ? 200 : 500;
        }

        // Тело ответа
        const result = {
            status: false,
            message: message,
        };

        // Отдаем ответ, чтобы не ждать обработки записи в лог файл
        res.status(code).json(result);

        // В зависимости от ошибки разный уровень логов
        if (err) {
            logger.error(
                { result, err },
                `[OUT] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`,
            );
        } else {
            logger.info(
                { result },
                `[OUT] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`,
            );
        }
    }
}

export default new Response();
