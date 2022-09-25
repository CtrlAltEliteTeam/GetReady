

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/Db');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//get all users
app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.user";
    db.query(sqlSelect,(err,result)=>{
        //console.log(result);
        if (err){ 
            throw err;
        }
        res.send(result);
    });
    
});

app.get('/api/getTournaments', (req, res)=>{
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.tournament";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.post('/api/login',(req,res)=>{
    //console.log(req.query);
    const email = req.query.email;
    const password =req.query.password;
    try {
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.user WHERE email=? AND password =?";
    db.query(sqlSelect,[email,password],(err,result)=>{ // add code so that the response data is just 301 if the username or password is incorrect
        //console.log(result);
        
        if(result.length===1){
            res.send(result);
        }else{
            res.send({error:301});
        }
    })
    }catch (err) {
        res.send({error:301}); 
    }
});

app.post('/api/register',(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    try{
        const sqlInsert = "INSERT INTO heroku_caad988da016f21.user(username, email, password) VALUES (?,?,?)";
        db.query(sqlInsert,[username, email, password],(err,result)=>{
            
            if(result?.affectedRows===1){
                res.send(result);
            }else{
                res.send({error:301});
            }
        });
    }catch(err){
        res.send({error:301});
    }
    
});



const PORT =process.env.PORT || 8000;
app.listen( PORT,()=>{    //8000
    console.log(`running on port ${PORT}`);
});