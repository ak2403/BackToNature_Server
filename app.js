const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

app.set('port', (process.env.PORT || 3000))

// var mysqlConnection = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '123456',
//     database : 'testdb',
//     port : '3306'
// });

// mysqlConnection.connect((error)=>{
//     if(!error){
//         console.log('succeed');
//     }
//     else{
//         return console.error('error' + error.message);
//     }
// });

app.get('/', (req, res) => {
    res.send("Connected")
});

app.listen(app.get('port'), () => {
    console.log('server running port is ', app.get('port'))
});

// app.get('/spices',(req,res)=>{
//     mysqlConnection.query('SELECT * FROM spices', (err, rows, fields)=>{
//         if(!err)
//         res.send(rows);
//         else
//         console.log(err);
//     })
// });

// app.get('/spices/:id',(req,res)=>{
//     mysqlConnection.query('SELECT * FROM spices WHERE idspices = ?',(req.params.id), (err, rows, fields)=>{
//         if(!err)
//         res.send(rows);
//         else
//         console.log(err);
//     })
// });