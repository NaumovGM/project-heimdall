import logger from './logger.mjs';

class Response {
    success(req, res, data) {
        const result = {
            status: true,
            data: typeof data === 'string' ? { message: data } : data,
        };
        const profile = req.profile ? req.profile.id : 'GUEST';

        res.status(200).json(result);

        // Логирование успешного ответа пользователю
        logger.info({ result }, `[OUT] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`);
    }

    failure(res, code = 200, result) {
        res.status(code).json(result);
    }
}

export default new Response();
