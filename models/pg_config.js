const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'ywnvexzvyvrczf',
        host: 'ec2-52-71-23-11.compute-1.amazonaws.com',
        database: 'd62f2va3cjc2fq',
        password: '415703cd95f9c919702c15ac35680f71ee0078616e5ce059cc31f2a6e5fa0f80',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        },

    }
);
module.exports = pg_conn;