// Middleware для установки безопасных ответов
import cors from 'cors';

function setupCors(app) {
    app.use(cors());
}

export default setupCors;
