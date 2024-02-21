// Middleware для подключения к базе MongoDB
import db from '../services/index.mjs';
import config from '../config/config.mjs';

let reconnectAttempts = 0; // Активные переподключения к базе

async function setupDatabase() {
    try {
        await db.mongoose.connect(db.url, {});
        console.log(`База данных подключена - ${db.url}`);
    } catch (err) {
        console.error('Ошибка подключения к базе данных');
        process.exit(1);
    }

    const dbConnection = db.mongoose.connection;

    dbConnection.on('error', (err) => {
        console.error('Ошибка подключения к базе данных');
    });

    dbConnection.on('disconnected', () => {
        console.error('Соединение с базой данных потеряно');
        if (reconnectAttempts < config.MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts++;

            // Повторное подключение через RECONNECT_TIMEOUT секунд
            setTimeout(async () => {
                try {
                    await db.mongoose.connect(db.url, {});
                    console.log(`База данных подключена - ${db.url}`);
                    reconnectAttempts = 0; // Сброс счетчика попыток после успешного подключения
                } catch (err) {
                    console.error('Ошибка переподключения к базе данных');
                }
            }, config.RECONNECT_TIMEOUT);
        } else {
            console.error(`Ошибка переподключения к базе данных ${config.MAX_RECONNECT_ATTEMPTS} раз - остановка процесса подключения`);
            process.exit(1);
        }
    });
}

export default setupDatabase;
