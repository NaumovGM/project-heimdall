// Инициализация первого запуска и установки конфигурации проекта
import fs from 'fs';
import { spawnSync } from 'child_process';
import readline from 'readline';

// Интерфейс для чтения из stdin и записи в stdout
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Путь до .env файла
const envFilePath = '../../.env';

// Массив с данными, которые нужно запросить у пользователя
const questions = ['Введите порт сервера: ', 'Введите URL базы данных: '];

// Функция для создания файла .env и заполнения его данными
function createEnvFile(envData) {
    fs.writeFileSync(envFilePath, envData);
}

// Рекурсивная функция для запроса данных от пользователя
function askQuestion(index, answers) {
    if (index < questions.length) {
        rl.question(questions[index], (answer) => {
            answers.push(answer);
            askQuestion(index + 1, answers);
        });
    } else {
        // Подготовка данных для .env файла
        const envData = `SERVER_PORT=${answers[0]}\nMONGO_URL=${answers[1]}\n`;
        createEnvFile(envData);

        console.log('[initHeimdall] Успешное создание .env файла с выбранной конфигурацией');
        // Закрытие интерфейса ввода-вывода
        rl.close();

        // Запуск очереди скриптов по порядку
        spawnSync('node', ['./generate/generateJwtSecret.mjs'], { stdio: 'inherit' });
        spawnSync('node', ['./generate/generateVapidKeys.mjs'], { stdio: 'inherit' });
        spawnSync('node', ['./generate/generateGrafanaAccess.mjs'], { stdio: 'inherit' });
        process.exit(0);
    }
}

if (!fs.existsSync(envFilePath)) {
    // Запуск с первого вопроса
    askQuestion(0, []);
} else {
    console.error('[initHeimdall] Файл конфигурации .env ранее уже был создан');
    process.exit(1);
}
