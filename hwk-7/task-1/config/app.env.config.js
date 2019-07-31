module.exports = {
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },

    db: {
        name: process.env.DB_NAME,
        port: process.env.MONGO_PORT || 27017
    },

    versioning: {
        app_version: process.env.APP_VERSION
    }
};