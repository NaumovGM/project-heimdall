// Модель топиков профилей для базы MongoDB
import { Schema, model } from 'mongoose';

const ProfileTopicType = {
    GENERAL: 0, // Главный
    OTHER: 1, // Прочее
};

const ProfileTopicSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            required: true,
            index: true,
        },
        type: {
            type: Number,
            enum: Object.values(ProfileTopicType),
            required: true,
            default: 0,
        },
    },
    { versionKey: false },
);

// Коллекция топиков для профилей
const ProfileTopic = model('profiles_topics', ProfileTopicSchema);

export default ProfileTopic;
