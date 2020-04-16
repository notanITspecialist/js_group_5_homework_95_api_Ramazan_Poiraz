const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');

const init = async () => {
    await mongoose.connect(config.baseUrl,config.baseConfig);

    await User.create({
        username: 'Admin',
        displayName: 'Admin',
        password: '12345',
        token: '12345',
        avatar: 'https://visualpharm.com/assets/488/Businessman-595b40b65ba036ed117d384d.svg',
        role: 'admin'
    })

};

init().catch(e => { throw e });