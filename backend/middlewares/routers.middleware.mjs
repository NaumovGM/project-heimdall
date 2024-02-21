// Middleware для подключение всех маршрутов
import routers from '../routers/index.mjs';

function setupRoutes(app) {
    app.use('/api', routers);
}

export default setupRoutes;
