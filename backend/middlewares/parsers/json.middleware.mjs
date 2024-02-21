// Middleware для обработки JSON формата
import { json } from 'express';

function setupJsonParser(app) {
    app.use(json());
}

export default setupJsonParser;
