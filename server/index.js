

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
    console.log(req);
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

//update tournament


//update profile
app.post('/api/updateProfile', (req,res)=>{
    const user_id = req.body.user_id;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const sqlUpdate = "UPDATE heroku_caad988da016f21.user SET username =?, email=?, password=? WHERE user_id=?";
    db.query(sqlUpdate, [username, email, password, user_id],(err, result)=> {
        if(result?.affectedRows===1){
            res.send(result);
        }else{
            res.send({error:301});
        }
    });

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

app.post('/api/joinTournament', (req,res)=>{
    const user_id = req.body.user_id;
    const tournament_id = req.body.tournament_id;
    try{
        const sqlInsert = "INSERT INTO heroku_caad988da016f21.entry(user_id, tournament_id) VALUES (?,?)";
        db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
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

app.post('/api/leaveTournament', (req,res)=>{
    const user_id = req.body.user_id;
    const tournament_id = req.body.tournament_id;
    try{
        const sqlInsert = "DELETE FROM heroku_caad988da016f21.entry WHERE user_id=? AND tournament_id =?";
        db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
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

app.post('/api/get_tournament_details', (req, res)=>{
    const tournament_id = req.body.tournament_id;
    try {
        const sqlSelect1 = "SELECT tournament.tournament_id, tournament.title, tournament.img, tournament.imgName, tournament.description, tournament.startTime, tournament.startDate, tournament.endDate, tournament.maxParticipants, game.game_id, game.name, game.img, game.imgName, entry.user_id, user.username FROM heroku_caad988da016f21.tournament INNER JOIN entry ON tournament.tournament_id = entry.tournament_id INNER JOIN user ON user.user_id = entry.user_id INNER JOIN game ON tournament.game_id = game.game_id WHERE tournament.tournament_id =?;";
        db.query(sqlSelect1,[tournament_id],(err,result)=>{
            res.send(result);
        });

    } catch (err) {
        res.send({error:301});
    }
});


const PORT =process.env.PORT || 8000;
app.listen( PORT,()=>{    //8000
    console.log(`running on port ${PORT}`);
});