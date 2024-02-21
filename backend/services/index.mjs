// Подключение всех моделей и создание объекта базы данных
import mongoose from 'mongoose';
import env from '../config/env.mjs';
import models from '../models/index.mjs';

const db = {
    mongoose,
    url: env.mongoUrl,
    models: models,
};

export default db;
