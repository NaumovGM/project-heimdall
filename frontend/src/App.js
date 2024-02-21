import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function App() {
    const [notifications, setNotifications] = useState([]);
    const serverUrl = 'test';
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(serverUrl + '/notifications'); // Загружаем данные с сервера
            const jsonData = await response.json();
            setNotifications(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Функция для преобразования Base64URL в Uint8Array
    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    };

    // Функция для регистрации подписки на уведомления
    async function subscribeToPush() {
        if ('serviceWorker' in navigator) {
            try {
                const serviceWorker = await navigator.serviceWorker.register('service-worker.js');
                const subscription = await serviceWorker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array('test'),
                });
                // Отправляем подписку на сервер
                console.log('test');
                await fetch(serverUrl + '/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Успешно подписаны на уведомления');
            } catch (error) {
                console.error('Ошибка подписки на уведомления:', error);
            }
        } else {
            console.log('ERROR');
        }
    }

    return (
        <div>
            {/* Надпись "Уведомления" справа от Avatar */}

            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" gutterBottom>
                    Уведомления
                </Typography>
                <Avatar onClick={subscribeToPush} style={{ cursor: 'pointer' }}>
                    <Notifications />
                </Avatar>
                {/* Меню */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Настройки</MenuItem>
                    <MenuItem onClick={handleClose}>Выход</MenuItem>
                </Menu>
            </Box>

            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success Alert with an encouraging title.
                </Alert>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    This is an info Alert with an informative title.
                </Alert>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    This is a warning Alert with a cautious title.
                </Alert>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error Alert with a scary title.
                </Alert>
            </Stack>

            {/* Добавьте дополнительные уведомления по аналогии */}
        </div>
    );
}

export default App;
