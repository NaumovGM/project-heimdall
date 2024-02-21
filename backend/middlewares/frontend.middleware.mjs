// Middleware для установки статичных файлов веб-сайта
import express from 'express';
import path from 'path';

const __dirname = path.resolve();

function setupFrontend(app) {
    // Обслуживание статических файлов из папки frontend/build
    app.use(express.static(path.join(__dirname, '../frontend/build')));
}

export default setupFrontend;
