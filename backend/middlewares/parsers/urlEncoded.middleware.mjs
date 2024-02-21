// Middleware для обработки application/x-www-form-urlencoded
import { urlencoded } from 'express';

function setupUrlEncodedParser(app) {
    app.use(urlencoded({ extended: true }));
}

export default setupUrlEncodedParser;
