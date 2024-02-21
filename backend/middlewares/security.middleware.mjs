// Middleware для установки безопасных headers
import helmet from 'helmet';

function setupSecurityHeaders(app) {
    app.use(helmet());
}

export default setupSecurityHeaders;
