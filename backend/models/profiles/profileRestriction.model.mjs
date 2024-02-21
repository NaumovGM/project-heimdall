// Модель ограничения профилей для базы MongoDB
import { Schema, model } from 'mongoose';

const ProfileRestrictionSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles',
            required: true,
            index: true,
        },
    },
    { versionKey: false },
);

// Коллекция ограничений для профилей
const ProfileRestriction = model('profiles_restrictions', ProfileRestrictionSchema);

export default ProfileRestriction;
