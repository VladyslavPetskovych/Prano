const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js',
    },
    target: 'node',
};