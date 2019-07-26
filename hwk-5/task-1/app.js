const app = require('./server');

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.listen(envConfig.server.port || 3000, () => {
    console.log(`The server is running on ${envConfig.server.port} port`);
});