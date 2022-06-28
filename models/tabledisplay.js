var pg_conn = require('./pg_config');

async function getTable(user)
{
    const acc_query = 
    {
        text: 'SELECT role FROM users WHERE username = $1',
        values: [user]
    };
    var query_data = await pg_conn.query(acc_query);
    var role = query_data.rows[0].role;
    const table_query = 
    {
        text: 'SELECT * FROM products WHERE shop = $1',
        values: [role]
    };
    query_data = await pg_conn.query(table_query);
    var dataTable = query_data.rows
    var stringTable = "<table><tr>"
    var headerData = Object.keys(dataTable[0])
    for(let headerIndex in headerData){
        var header = "<th>"+headerData[headerIndex]+"</th>"
        stringTable+=header
    }
    for(let rowIndex in dataTable){
        var bodyTable = "<tr>"
        rowData = dataTable[rowIndex]
        for(let fieldIndex in rowData){
            var cell = "<td>"+rowData[fieldIndex]+"</td>"
            bodyTable+=cell
        }
        bodyTable+="</tr>"
        stringTable+=bodyTable
    }
    stringTable+="</table>"
    console.log(stringTable)
    return stringTable;
}

module.exports = getTable;