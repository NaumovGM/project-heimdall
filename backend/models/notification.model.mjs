// Модель уведомлений для базы MongoDB
import { Schema, model } from 'mongoose';

const NotificationStatus = {
    SEND: 0, // Отправлено
    RECEIVED: 1, // Получено
};

const NotificationSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            required: true,
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
    },
    { versionKey: false },
);

// Коллекция уведомлений
const Notification = model('notifications', NotificationSchema);

export default Notification;
