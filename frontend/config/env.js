// Загрузка файла конфигурации .env
const dotenv = require('dotenv');
dotenv.config();

const env = {
    serverPort: process.env.SERVER_PORT,
};

module.exports = env;
