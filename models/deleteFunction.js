var pg_conn = require('./pg_config');
async function deleteFunction(id)
{
    const id_query = 
    {
        text: 'DELETE FROM products where id = $1',
        values: [id]
    }
    console.log(id_query)
    var query_data = await pg_conn.query(id_query);
}
module.exports = deleteFunction;