

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/Db');



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

app.get('/api/login',(req,res)=>{
    const email = 'test@gmail.com';//req.body.email;
    const password ='test' ;//req.body.password;
    const sqlSelect = "SELECT * FROM users WHERE email=? AND password =?";
    db.query(sqlSelect,[email,password],(err,result)=>{
       console.log(result);
       res.send(result);
    });
    
});

app.post('/api/insert',(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "INSERT INTO users(email,joinDate,password,username) VALUES (?,CURDATE(),?,?)";
    db.query(sqlInsert,['test4@gmail.com',password,username],(err,result)=>{
        console.log(result)
    });
});

const PORT =process.env.PORT || 8000;
app.listen( PORT,()=>{    //8000
    console.log(`running on port ${PORT}`);
});