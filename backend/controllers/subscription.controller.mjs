// Контроллер управления подписками

class SubscriptionController {
    // Связывание контекста класса с методами
    constructor() {}

    // Создание подписки
    async createSubscription(req, res, next) {
        try {
            res.status(201).json({});
        } catch (error) {
            console.error();
        }
        subscription = req.body;
        console.log(subscription);
    }

    // Получение всех подписок пользователя
    async getSubscriptions(req, res, next) {}

    // Получение одной подписки
    async getSubscriptionByID(req, res, next) {}

    // Обновление подписки
    async updateSubscription(req, res, next) {}
}

export default new SubscriptionController();
