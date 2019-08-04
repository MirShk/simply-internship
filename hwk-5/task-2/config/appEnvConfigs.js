module.exports = {
    server: {
        port: process.env.PORT,
        host: process.env.HOST,
    },

    db: {
        name: process.env.DB_NAME,
        port: process.env.DB_PORT
    },

    versioning: {
        app_version: process.env.APP_VERSION
    }
};