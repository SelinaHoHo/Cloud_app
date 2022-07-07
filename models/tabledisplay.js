var pg_conn = require('./pg_config');

async function getTable(user)
{
    const acc_query = 
    {
        text: 'SELECT role FROM users WHERE user_name = $1',
        values: [user]
    };
    console.log(user)
    var query_data = await pg_conn.query(acc_query);
    var role = query_data.rows[0].role;
    let table_query = {}
    if(role == 'manager'){
        table_query=
        {
            text: 'SELECT * FROM products'
        };
    }
    else{
        table_query = 
        {
            text: 'SELECT * FROM products WHERE shop = $1',
            values: [role]
        };
    }
    query_data = await pg_conn.query(table_query);
    var dataTable = query_data.rows
    var stringTable = "<table><tr>"
    var headerData = Object.keys(dataTable[0])
    for(let headerIndex in headerData){
        var header = "<th>"+headerData[headerIndex]+"</th>"
        stringTable+=header
    }
    stringTable += "<th> CRUD </th>"; 
    for(let rowIndex in dataTable){
        var bodyTable = "<tr>"
        rowData = dataTable[rowIndex]
        id_product = rowData[Object.keys(rowData)[0]]
        for(let fieldIndex in rowData){
            var cell = "<td>"+rowData[fieldIndex]+"</td>"
            bodyTable+=cell
        }
        var get_query = "?id=" + id_product + "&user="+ user 
        bodyTable += `<td> <a href='/users/edit${get_query}'> Edit/ </a> <a href='/users/delete${get_query}'> Delete </a> </td>`
        bodyTable+="</tr>"
        stringTable+=bodyTable
    }
    stringTable += `<tr><form method='POST' action='/users/add${get_query}'>`
    for(let headerIndex in headerData){
        stringTable += `<td><input type='text' name=${headerData[headerIndex]} ></td>`;
    }
    stringTable += "<td> <button type='submit'> Add </button></td>"
    stringTable += "</form></tr>"
    stringTable+="</table>"
    console.log(stringTable)
    return stringTable;
}

module.exports = getTable;