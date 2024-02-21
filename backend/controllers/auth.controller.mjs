// Контроллер управления авторизацией
import InvitationService from '../services/invitation.service.mjs';
import Response from '../utils/response.mjs';

class AuthController {
    // Связывание контекста класса с методами
    constructor() {}

    // Регистрация профиля
    async createProfile(req, res, next) {
        try {
            const phone = req.body.phone;
            const key = req.body.key;

            if (!phone || !key) {
                throw Error('Отсутствуют необходимые параметры для регистрации');
            }

            const invitation = await InvitationService.findInvitationByPhone(phone);
            if (!invitation) {
            }

            Response.success(req, res, 'Успешная регистрация профиля');
        } catch (error) {
            next(error);
        }
    }

    // Авторизация в приложении
    async createSession(req, res, next) {
        res.status(200).json({ status: true });
    }

    // Обновление токенов пользователя
    async updateTokens(req, res, next) {
        res.status(200).json({ status: true });
    }

    // Выход пользователя из приложения
    async deleteSession(req, res, next) {
        res.status(200).json({ status: true });
    }
}

export default new AuthController();
