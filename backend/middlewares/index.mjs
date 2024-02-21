// Экземпляры всех middlewares
import setupDatabase from './database.middleware.mjs';
import setupCors from './cors.middleware.mjs';
import setupFrontend from './frontend.middleware.mjs';
import setupSecurityHeaders from './security.middleware.mjs';
import setupJsonParser from './parsers/json.middleware.mjs';
import setupUrlEncodedParser from './parsers/urlEncoded.middleware.mjs';
import setupRequestId from './requestId.middleware.mjs';
import setupRoutes from './routers.middleware.mjs';
import setupNotFound from './notFound.middleware.mjs';
import setupError from './error.middleware.mjs';

const middlewares = {
    setupDatabase,
    setupCors,
    setupFrontend,
    setupSecurityHeaders,
    setupJsonParser,
    setupUrlEncodedParser,
    setupRequestId,
    setupRoutes,
    setupNotFound,
    setupError,
};

export default middlewares;
