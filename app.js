const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

app.set('port', (process.env.PORT || 3000))

var mysqlConnection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: 'root',
    password: process.env.HOST_PASS,
    database: process.env.HOST_DB,
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
    mysqlConnection.query('SELECT * FROM species', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
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
