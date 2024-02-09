// Загрузка файла конфигурации .env
import { config } from 'dotenv';
config();

const env = {
    serverPort: process.env.SERVER_PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
};

export default env;
