const path = require("path");
const dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./client/src/indexReducer.js",
    output: {
        path: path.join(__dirname, "./client/dist"),
        filename: "index_bundle.js"
    },
    plugins: [
        new dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};