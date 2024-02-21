// Middleware для обработки ошибок
import Response from '../utils/response.mjs';

function setupError(app) {
    app.use((err, req, res, next) => {
        Response.failure(req, res, err.message, err);
    });
}

export default setupError;
