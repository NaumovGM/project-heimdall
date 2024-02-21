// Модель подписок для базы MongoDB
import { Schema, model } from 'mongoose';

const SubscriptionSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            required: true,
            index: true,
        },
        subscription: {
            type: Object,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false },
);

// Коллекция подписок на уведомления
const Subscription = model('subscriptions', SubscriptionSchema);

export default Subscription;
