// Функция подключения web-push
import webpush from 'web-push';
import env from '../config/env.mjs';

class WebPush {
    async setupWebPush() {
        // Проверяем наличие ключей в конфигурации
        if (!env.vapidPublicKey || !env.vapidPrivateKey) {
            console.error('В конфигурации отсутствуют ключи VAPID');
        }

        // Установка настроек VAPID и email для контакта
        try {
            webpush.setVapidDetails('mailto:naumov.gm@mail.ru', env.vapidPublicKey, env.vapidPrivateKey);
        } catch (error) {
            console.error('Ошибка при установке параметров VAPID:', error);
        }
    }
}

export default new WebPush();
