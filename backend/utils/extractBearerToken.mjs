// Функция получения токена из Header запроса

function extractBearerToken(header) {
    if (header == null) {
        return null;
    }

    const match = header.match(/^Bearer (.+)$/);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}

export default extractBearerToken;
