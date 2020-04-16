const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploads: path.join(rootPath, 'public', 'uploads'),
    baseUrl: 'mongodb://localhost/bar',
    baseConfig: {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    facebook: {
        appId: '559420338346131',
        appSecret: '482cd520b5c71aecd11d7c2f5c6dbaf5'
    }
};