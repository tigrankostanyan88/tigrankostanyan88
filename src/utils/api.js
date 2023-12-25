const routes = require('../routes');

module.exports = api = (app) => {
    // API RUOTES
    app.use('/api/v1/test', routes.test);

    // VIEW RUOTES
    app.use('/', routes.view);
    app.use('/admin-drive', routes.adminView);
};
