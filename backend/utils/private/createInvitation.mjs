import fs from 'fs';
import readline from 'readline';
import Invitation from '../../models/invitation.model.mjs';
import db from '../../services/index.mjs';
import dotenv from 'dotenv';

// Создание интерфейса для чтения из stdin и записи в stdout
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Функция для создания записи приглашения
const createInvitation = async (phone, email, surname, name, patronymic) => {
    try {
        // Проверка, что все параметры переданы
        if (!phone || !email || !surname || !name || !patronymic) {
            throw new Error('[createInvitation] Необходимо заполнить все поля');
        }

        // Подключение к базе данных
        await db.mongoose.connect(env.MONGO_URL, {});

        // Проверка, что телефон и email уникальны
        const existingInvitation = await Invitation.findOne({
            $or: [{ phone }, { email }],
        });
        if (existingInvitation) {
            throw new Error('[createInvitation] Приглашение с таким телефоном или почтой уже существует');
        }

        // Создание новой записи приглашения
        const newInvitation = new Invitation({
            phone: phone,
            email: email,
            surname: surname,
            name: name,
            patronymic: patronymic,
        });

        // Сохранение записи в базе данных
        await newInvitation.save();

        console.log('[createInvitation] Приглашение успешно создано, ключ для пользователя:', newInvitation.key);
        process.exit(0);
    } catch (error) {
        console.error('[createInvitation] ', error.message);
        process.exit(1);
    }
};

// Получение текущей конфигурации запуска
const envFilePath = '../../.env';

if (!fs.existsSync(envFilePath)) {
    console.error('[createInvitation] Файл конфигурации .env отсутствует');
    process.exit(1);
}

const env = dotenv.parse(fs.readFileSync(envFilePath));

// Функция для запроса данных от пользователя
const askQuestion = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
};

// Функция для последовательного запроса всех данных от пользователя
const promptUser = async () => {
    const phone = await askQuestion('Введите номер телефона: ');
    const email = await askQuestion('Введите адрес электронной почты: ');
    const surname = await askQuestion('Введите фамилию: ');
    const name = await askQuestion('Введите имя: ');
    const patronymic = await askQuestion('Введите отчество: ');

    // Вызов функции создания приглашения с переданными параметрами
    createInvitation(phone, email, surname, name, patronymic);

    // Закрытие интерфейса ввода-вывода
    rl.close();
};

// Вызов функции для запроса данных от пользователя
promptUser();
