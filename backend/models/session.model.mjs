// Модель сессий для базы MongoDB
import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config.mjs';

const SessionSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            index: true,
        },
        refreshToken: {
            type: Schema.Types.UUID,
            default: uuidv4,
            index: true,
            unique: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
        },
        ip: {
            type: String,
            required: true,
        },
        expiresIn: {
            type: Date,
            default: () => Date.now() + config.REFRESH_TOKEN_LIFETIME * 24 * 60 * 60 * 1000,
        },
        createdAt: {
            type: Date,
            expires: config.REFRESH_TOKEN_LIFETIME * 24 * 60 * 60,
            default: Date.now,
        },
    },
    { versionKey: false },
);

// Коллекция сессий
const Session = model('sessions', SessionSchema);

export default Session;
