// Middleware для установки идентификатора запроса
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.mjs';

function setupRequestId(app) {
    app.use((req, res, next) => {
        req.id = uuidv4(); // Генерация уникального идентификатора и добавление его к объекту запроса
        const request = req.method === 'POST' ? req.body : req.params;
        const profile = req.profile ? req.profile.id : 'GUEST';
        // Проверка, что request не пустой
        const requestData = request && Object.keys(request).length > 0 ? { request } : {};
        logger.info(
            { ...requestData },
            `[IN] [ID:${req.id}] [IP:${req.ip}] [PROFILE:${profile}] [METHOD:${req.method}] [URL:${req.originalUrl}]`,
        );
        next();
    });
}

export default setupRequestId;
