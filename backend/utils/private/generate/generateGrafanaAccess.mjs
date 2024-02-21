import fs from 'fs';
import dotenv from 'dotenv';
import { randomBytes, createHash } from 'crypto';
import readline from 'readline';

// Создаем интерфейс для чтения из stdin и записи в stdout
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Загрузка значений из .env файла
const envFilePath = '../../.env';

if (!fs.existsSync(envFilePath)) {
    console.error('[createInvitation] Файл конфигурации .env отсутствует');
    process.exit(1);
}

const env = dotenv.parse(fs.readFileSync(envFilePath));

// Проверяем, существуют ли параметры GRAFANA_USERNAME, GRAFANA_PASSWORD и GRAFANA_URL в .env файле
const existingGrafanaUsername = env.GRAFANA_USERNAME;
const existingGrafanaPassword = env.GRAFANA_PASSWORD;
const existingGrafanaUrl = env.GRAFANA_URL;

// Спрашиваем пользователя, хочет ли он обновить параметры GRAFANA_USERNAME, GRAFANA_PASSWORD и GRAFANA_URL
if (existingGrafanaUsername || existingGrafanaPassword || existingGrafanaUrl) {
    rl.question(
        'Параметры GRAFANA_USERNAME, GRAFANA_PASSWORD или GRAFANA_URL уже существуют. Вы уверены, что хотите их обновить? (да/нет): ',
        (answer) => {
            if (answer.trim().toLowerCase() === 'да') {
                generateAndWriteGrafanaAccess(env, envFilePath);
            } else {
                console.log('[generateGrafanaAccess] Отмена генерации доступа для Grafana');
                process.exit(0);
            }
            rl.close();
        },
    );
} else {
    generateAndWriteGrafanaAccess(env, envFilePath);
}

// Функция для генерации доступа для Grafana и записи в .env файл
function generateAndWriteGrafanaAccess(env, envFilePath) {
    // Генерация случайной ссылки и пароля
    const newUrl = randomBytes(12).toString('hex'); // Генерация случайного хеша для URL
    const newPassword = randomBytes(16).toString('hex'); // Генерация случайного пароля

    // Создание хеша от пароля
    const hashedPassword = createHash('sha256').update(newPassword).digest('hex');

    // Обновление значений параметров
    env.GRAFANA_USERNAME = 'grafana';
    env.GRAFANA_PASSWORD = hashedPassword;
    env.GRAFANA_URL = newUrl;

    // Формирование строки для записи в .env файл
    const envData = Object.entries(env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    // Запись обновленных значений обратно в .env файл
    fs.writeFileSync(envFilePath, envData);

    console.log('[generateGrafanaAccess] Успешная генерация и обновление доступа для Grafana');
    process.exit(0);
}
