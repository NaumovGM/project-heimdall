// Middleware для обработки ошибок

import logger from '../utils/logger.mjs';
import Response from '../utils/response.mjs';

function setupError(app) {
    app.use((err, req, res, next) => {
        const profile = req.profile ? req.profile.id : 'GUEST';
        const message = err instanceof Error ? err.message : 'Ошибка сервера';
        const code = err instanceof Error ? 200 : 500;
        const result = {
            status: false,
            message: message,
        };
        logger.error(
            { result, err },
            `[OUT] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`,
        );
        Response.failure(res, code, result);
    });
}

export default setupError;
