self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
        body: data.title, // Текст уведомления
        icon: 'icons/icon-72x72.png',
        data: { url: data.link }, // Данные, которые будут переданы при клике на уведомление
        vibrate: [100, 50, 100],
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options).then(() => {
            // Отправляем POST-запрос на сервер, сообщая, что уведомление было получено
            return fetch('test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationId: data.id }),
            });
        })
    );
});
