const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

app.set('port', (process.env.PORT || 3000))

var mysqlConnection = mysql.createConnection({
    host: "35.184.92.144",
    user: 'root',
    password: "thats11310104007",
    database: "btnspecies",
    port: '3306'
});

var mysqlPool = mysql.createPool({
    host: "35.184.92.144",
    user: 'root',
    password: "thats11310104007",
    database: "btnspecies",
    port: '3306'
});

mysqlConnection.connect((error) => {
    if (!error) {
        console.log('succeed');
    }
    else {
        return console.error('error' + error.message);
    }
});

app.get('/', (req, res) => {
    res.send("Connected")
});

app.listen(app.get('port'), () => {
    console.log('server running port is ', app.get('port'))
});


//get all spices information
app.get('/spices', (req, res) => {
    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            //   callback(true); 
            return;
        }
        var sql = "SELECT * FROM species";
        connection.query(sql, [], function (err, results) {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            res.send(results)
        });
    });
});
//dispalu only description and name columns
app.get('/list', (req, res) => {
    mysqlConnection.query('SELECT `Threatened status`, `Common Name` FROM species', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//search by id
app.get('/spices/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM species WHERE id = ?', (req.params.id), (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
