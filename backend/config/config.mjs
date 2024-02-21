// Конфигурация для инициализации приложения
const config = {
    ALLOWED_URLS_DEBUG: {
        grafana: ['::1'], // Список разрешенных адресов для сервиса Grafana
    },
    ALLOWED_TOPICS: {
        GRAFANA: 200, // Общий топик для уведомления от сервиса Grafana
    },
    ACCESS_TOKEN_LIFETIME: '30m', // Время жизни Access Token в минутах
    REFRESH_TOKEN_LIFETIME: 60, // Время жизни Refresh Token в днях
    MAX_SESSION_ALLOWED: 5, // Максимальное количество сессий у пользователя
    MAX_RECONNECT_ATTEMPTS: 3, // Количество попыток переподключения к базе
    RECONNECT_TIMEOUT: 10000, // Время таймаута для подключения к базе
};

export default config;
