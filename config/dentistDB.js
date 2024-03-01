const mysql = require('mysql')

var connection = mysql.createPool({
    host :'localhost',
    user: 'root',
    password: '00440044Cc#',
    database: 'dentist'
})

module.exports = connection;