const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');


const db = mysql.createPool({
    host: 'localhost',
    user: 'james',
    password: 'jamesthackeray',
    database: 'crud-get-ready'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect,(err,result)=>{
       // console.log(result);
        res.send(result);
    });
    
});

app.post('/api/insert',(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "INSERT INTO users(email,joinDate,password,username) VALUES (?,CURDATE(),?,?)";
    db.query(sqlInsert,['test3@gmail.com',password,username],(err,result)=>{
        console.log(result)
    });
});

app.listen(8000,()=>{
    console.log("running on port 8000");
});