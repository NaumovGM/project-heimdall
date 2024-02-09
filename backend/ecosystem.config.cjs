// Файл конфигурации для pm2

module.exports = {
    apps: [
        {
            name: 'backend-heimdall',
            script: 'app.mjs',
            instances: 1,
            exec_mode: 'fork',
        },
    ],
};
