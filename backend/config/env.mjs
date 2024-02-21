// Конфигурации для запуска приложения .env
import { config } from 'dotenv';
config();

const env = {
    serverPort: process.env.SERVER_PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
    grafanaUsername: process.env.GRAFANA_USERNAME,
    grafanaPassword: process.env.GRAFANA_PASSWORD,
    grafanaUrl: process.env.GRAFANA_URL,
};

export default env;
