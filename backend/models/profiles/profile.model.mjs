// Модель профиля для базы MongoDB
import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema(
    {
        phone: {
            type: Number,
            required: true,
            index: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
    },
    { versionKey: false },
);

// Коллекция профилей
const Profile = model('profiles', ProfileSchema);

export default Profile;
