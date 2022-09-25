

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

app.post('/api/createTournament', (req, res)=>{
    const title = req.body.title; 
    const description = req.body.description;
    const startDate= req.body.startDate; 
    const endDate= req.body.endDate; 
    const num_participants= req.body.num_participants; 
    const user_id= req.body.creator_id; 
    const game_id= req.body.game_id; 
    const startTime= req.body.startTime; 
    const viewParticipant= req.body.viewParticipant;
    const img= req.body.img;
    const imgName= req.body.imgName;
    const content = req.body.content;
    try {
        const sqlInsert = "INSERT INTO heroku_caad988da016f21.tournament(title, description, startDate, endDate, num_participants, user_id, game_id, startTime, viewParticipant, img, imgName, content) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [title, description, startDate, endDate, num_participants, user_id, game_id, startTime, viewParticipant, img, content], (err, result)=> {
            if(result?.affectedRows===1){
                res.send(result);
            }else{
                res.send({error:301});
            }
        });
    } catch (err) {
        res.send({error:301});
    }
    
});

app.get('/api/getAllTournaments', (req, res)=>{
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.tournament";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.get('/api/getTournamentShort', (req, res)=>{
    const sqlSelect = "SELECT tournament_id, title, img, imgName, content, user_id, viewParticipant FROM heroku_caad988da016f21.tournament";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.post('/api/addGame',(req,res)=>{
    const name = req.body.name;
    const img = req.body.img;
    const imgName = req.body.imgName;
    const content = "GAME";
    try{
        const sqlInsert = "INSERT INTO heroku_caad988da016f21.game(name, img, imgName, content) VALUES (?,?,?,?)";
        db.query(sqlInsert,[name, img, imgName, content],(err,result)=>{
            
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

app.post('/api/getTournamentDetails', (req, res)=>{
    const tournament_id = req.query.tournament_id;
    try {
        const sqlSelect1 = "SELECT * FROM heroku_caad988da016f21.tournament WHERE tournament_id=? ";
        db.query(sqlSelect1,[tournament_id],(err,result)=>{
            res.send(result.game_id);
        });

        //const game_id = result

        // const sqlSelect2 = "SELECT * FROM heroku_caad988da016f21.game WHERE game_id=? ";
        // db.query(sqlSelect2,[game_id],(err,result)=>{
        //     res.send(result);
        // });
    } catch (err) {
        res.send({error:301});
    }
});


const PORT =process.env.PORT || 8000;
app.listen( PORT,()=>{    //8000
    console.log(`running on port ${PORT}`);
});