// Middleware для обработки запросов по которым отсутствует страница
function setupNotFound(app) {
    app.use((req, res, next) => {
        res.status(404).json({ status: false, message: 'Запрашиваемая страница не найдена' });
    });
}

export default setupNotFound;
