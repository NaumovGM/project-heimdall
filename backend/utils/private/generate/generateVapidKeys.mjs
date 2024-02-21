import fs from 'fs';
import dotenv from 'dotenv';
import webpush from 'web-push';
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

// Проверяем, существуют ли параметры VAPID_PUBLIC_KEY и VAPID_PRIVATE_KEY в .env файле
const existingVapidPublicKey = env.VAPID_PUBLIC_KEY;
const existingVapidPrivateKey = env.VAPID_PRIVATE_KEY;

// Спрашиваем пользователя, хочет ли он обновить параметры VAPID_PUBLIC_KEY и VAPID_PRIVATE_KEY
if (existingVapidPublicKey || existingVapidPrivateKey) {
    rl.question(
        'Параметры VAPID_PUBLIC_KEY и VAPID_PRIVATE_KEY уже существуют. Вы уверены, что хотите их обновить? (да/нет): ',
        (answer) => {
            if (answer.trim().toLowerCase() === 'да') {
                generateAndWriteVapidKeys(env, envFilePath);
            } else {
                console.log('[generateVapidKeys] Отмена генерации VAPID ключей');
                process.exit(0);
            }
            rl.close();
        },
    );
} else {
    generateAndWriteVapidKeys(env, envFilePath);
}

// Функция для генерации VAPID ключей и записи в .env файл
function generateAndWriteVapidKeys(env, envFilePath) {
    // Генерация VAPID-ключей
    const vapidKeys = webpush.generateVAPIDKeys();

    env.VAPID_PUBLIC_KEY = vapidKeys.publicKey;
    env.VAPID_PRIVATE_KEY = vapidKeys.privateKey;

    // Формирование строки для записи в .env файл
    const envData = Object.entries(env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    // Запись обновленных значений обратно в .env файл
    fs.writeFileSync(envFilePath, envData);

    console.log('[generateVapidKeys] Успешная генерация и обновление VAPID ключей');
    process.exit(0);
}
