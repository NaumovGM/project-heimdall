// Контроллер управления уведомлений
import Response from '../utils/response.mjs';

class NotificationController {
    // Связывание контекста класса с методами
    constructor() {
        this.createNotificationGrafana = this.createNotificationGrafana.bind(this);
    }

    // Получение всех уведомлений
    async getNotifications(req, res, next) {
        // Тестовые данные уведомлений
        const testNotifications = [
            { id: 1, type: 'Важное', date: '2024-02-10', title: 'Уведомление 1', body: 'Текст первого уведомления' },
            { id: 2, type: 'Обычное', date: '2024-02-09', title: 'Уведомление 2', body: 'Текст второго уведомления' },
            { id: 3, type: 'Информация', date: '2024-02-08', title: 'Уведомление 3', body: 'Текст третьего уведомления' },
        ];
        Response.success(req, res, testNotifications);
    }

    // Получение одного уведомления
    async getNotificationByID(req, res, next) {
        res.status(200).json({ status: true });
    }

    // Обновление уведомления
    async updateNotification(req, res, next) {
        res.status(200).json({ status: true });
    }

    // Удаление уведомления
    async deleteNotification(req, res, next) {
        res.status(200).json({ status: true });
    }

    /* 
    Webhooks для внешних сервисов
    */

    // Webhook для сервиса Grafana
    async createNotificationGrafana(req, res, next) {
        const notification = await this.#createNotification();
        Response.success(req, res, 'Все ок');
    }

    /* 
    Приватные методы для класса NotificationController
    */

    // Механизм преобразования и создания уведомления
    async #createNotification(notification) {
        return true;
    }

    // Механизм отправки уведомления
    async #sendNotification(notification) {
        return true;
    }
}

export default new NotificationController();
