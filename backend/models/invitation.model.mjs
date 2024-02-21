// Модель приглашений для базы MongoDB
import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const InvitationStatus = {
    CREATED: 0, // Создано
    ACCEPTED: 1, // Принято
};

const InvitationDepartment = {
    DEPARTMENT_1: 0, // Первый департамент
    DEPARTMENT_2: 1, // Второй департамент
};

const InvitationSchema = new Schema(
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
        department: {
            type: Number,
            enum: Object.values(InvitationDepartment),
            required: true,
        },
        status: {
            type: Number,
            enum: Object.values(InvitationStatus),
            required: true,
            default: 0,
        },
        key: {
            type: Schema.Types.UUID,
            default: uuidv4,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false },
);

// Коллекция приглашений
const Invitation = model('invitations', InvitationSchema);

export default Invitation;
