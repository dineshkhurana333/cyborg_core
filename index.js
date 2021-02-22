const { connectDB } = require('./app/config/db-config');

require('./app/config/db-config').connectDB();
require('./app/bin/server');
