import fs from 'fs';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
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

// Проверяем, существует ли параметр JWT_SECRET в .env файле
if (env.JWT_SECRET) {
    // Спрашиваем пользователя, хочет ли он обновить JWT_SECRET
    rl.question('Параметр JWT_SECRET уже существует. Вы уверены, что хотите обновить его? (да/нет): ', (answer) => {
        if (answer.trim().toLowerCase() === 'да') {
            generateAndWriteJwtSecret(env, envFilePath);
        } else {
            console.log('[generateJwtSecret] Отмена генерации JWT Secret.');
            process.exit(0);
        }
        rl.close();
    });
} else {
    generateAndWriteJwtSecret(env, envFilePath);
}

// Функция для генерации JWT_SECRET и записи в .env файл
function generateAndWriteJwtSecret(env, envFilePath) {
    const newJwtSecret = randomBytes(14).toString('hex');
    env.JWT_SECRET = newJwtSecret;

    // Формирование строки для записи в .env файл
    const envData = Object.entries(env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    // Запись обновленных значений обратно в .env файл
    fs.writeFileSync(envFilePath, envData);

    console.log('[generateJwtSecret] Успешная генерация и обновление JWT Secret хеша');
    process.exit(0);
}
