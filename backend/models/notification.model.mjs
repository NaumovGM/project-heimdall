// Модель уведомлений для базы MongoDB
import { Schema, model } from 'mongoose';

const NotificationStatus = {
    SEND: 0, // Отправлено
    RECEIVED: 1, // Получено
};

const NotificationType = {
    ONE: 0, // Один получателя
    MANY: 1, // Несколько получателей
};

const NotificationSchema = new Schema(
    {
        type: {
            type: Number,
            enum: Object.values(NotificationType),
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            required: [
                function () {
                    return this.type == 0; // Обязателен в случае когда NotificationType == ONE
                },
                'Профиль обязателен для заполнения',
            ],
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: false,
        },
        status: {
            type: Number,
            enum: Object.values(NotificationStatus),
            required: true,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false },
);

// Коллекция уведомлений
const Notification = model('notifications', NotificationSchema);

export default Notification;
