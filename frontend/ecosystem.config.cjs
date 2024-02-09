// Файл конфигурации для pm2

module.exports = {
    apps: [
        {
            name: 'frontend-heimdall',
            script: 'server.js',
            instances: 1,
            exec_mode: 'fork',
        },
    ],
};
