// Модель профиля для базы MongoDB
import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema(
    {
        phone: {
            type: Number,
            required: true,
            index: true,
            unique: true,
            validate: {
                validator: function (value) {
                    // Проверка начальной цифры и общей длины
                    return /^7\d{10}$/.test(value.toString()); // Преобразование в строку для проверки регулярным выражением
                },
                message: 'Неверный формат номера телефона',
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Неверный формат электронной почты',
            },
        },
        surname: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        patronymic: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false },
);

// Коллекция профилей
const Profile = model('profiles', ProfileSchema);

export default Profile;
