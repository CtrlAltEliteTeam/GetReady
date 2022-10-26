

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
        if (err){ 
            throw err;
        }
        res.send(result);
    });
    
});

//Login and Register_________________________________________________________________________________________________________________________________________

app.post('/api/login',(req,res)=>{
    const email = req.body.email;
    const password =req.body.password;
    try {
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.user WHERE email=? AND password =?";
    db.query(sqlSelect,[email,password],(err,result)=>{ // add code so that the response data is just 301 if the username or password is incorrect
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
        const sqlSelect = "SELECT * FROM heroku_caad988da016f21.user WHERE email=?";
        db.query(sqlSelect,[email],(err,result)=>{ // add code so that the response data is just 301 if the username or password is incorrect
        if(result.length===1){
            res.send({error:301});
        }else{
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
        }
    })
    }catch (err) {
            res.send({error:301}); 
    }
});

//Selects____________________________________________________________________________________________________________________________________________________

app.get('/api/get_all_tournaments', (req, res)=>{
    const sqlSelect = "SELECT * FROM heroku_caad988da016f21.tournament";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.post('/api/get_tournament_short', (req, res)=>{
    const sqlSelect = "SELECT tournament.tournament_id, tournament.title, tournament.content, tournament.user_id, game.name FROM heroku_caad988da016f21.tournament INNER JOIN game ON tournament.game_id = game.game_id";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.post('/api/get_games', (req, res)=>{
    const sqlSelect = "SELECT game_id, name FROM heroku_caad988da016f21.game";
    db.query(sqlSelect, (err, result)=> {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.post('/api/get_tournament_details', (req, res)=>{
    const tournament_id = req.body.tournament_id;
    try {
        const sqlSelect = "SELECT user.user_id, user.username, tournament.description, tournament.startTime, tournament.startDate, tournament.endDate, tournament.numParticipants, tournament.maxParticipants, tournament.viewParticipant, tournament.state, tournament.winner_username FROM heroku_caad988da016f21.tournament INNER JOIN user ON tournament.user_id = user.user_id WHERE tournament.tournament_id = ?;";
        db.query(sqlSelect,[tournament_id],(err,result)=>{
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

app.post('/api/get_t_update_details', (req, res)=>{
    const tournament_id = req.body.tournament_id;
    try {
        const sqlSelect = "SELECT tournament_id, title, description, startDate, endDate, maxParticipants, startTime, game_id, viewParticipant FROM heroku_caad988da016f21.tournament WHERE tournament_id = ?;";
        db.query(sqlSelect,[tournament_id],(err,result)=>{
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

app.post('/api/get_participants', (req, res)=>{
    const tournament_id = req.body.tournament_id;
    try {
        const sqlSelect = "SELECT user.username FROM heroku_caad988da016f21.user INNER JOIN entry ON user.user_id = entry.user_id WHERE entry.tournament_id =? ;";
        db.query(sqlSelect,[tournament_id],(err,result)=>{
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

app.post('/api/is_participating', (req, res)=>{
    const tournament_id = req.body.tournament_id;
    const user_id = req.body.user_id;
    try {
        const sqlSelect = "SELECT * FROM heroku_caad988da016f21.entry WHERE tournament_id =? AND user_id =?;";
        db.query(sqlSelect,[tournament_id, user_id],(err,result)=>{
            if (result.length>=1) {
                res.send({joinLeave:true});
            } else{
                res.send({joinLeave:false});
            }
        });
    } catch (err) {
        res.send({error:301});
    }
});

app.post('/api/get_user_details', (req, res)=>{
    const user_id = req.body.user_id;
    try {
        const sqlSelect = "SELECT user_id, username, email FROM heroku_caad988da016f21.user WHERE user_id =?;";
        db.query(sqlSelect,[user_id],(err,result)=>{
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

//search and filter
app.post('/api/search_by_title', (req, res)=>{
    const title = req.body.tournament_title;
    try {
        const sqlSelect = "SELECT tournament.tournament_id, tournament.title, tournament.content, tournament.user_id, game.name FROM heroku_caad988da016f21.tournament INNER JOIN game ON tournament.game_id = game.game_id WHERE tournament.title =?;";
        db.query(sqlSelect,[title],(err,result)=>{
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

app.post('/api/get_my_tournaments', (req, res)=>{
    const user_id = req.body.user_id;
    try {
        const sqlSelect = "SELECT tournament.tournament_id, tournament.title, tournament.content, tournament.user_id, game.name FROM heroku_caad988da016f21.tournament INNER JOIN game ON tournament.game_id = game.game_id INNER JOIN user ON tournament.user_id = user.user_id WHERE user.user_id =?;";
        db.query(sqlSelect,[user_id],(err,result)=>{
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        res.send({error:301});
    }
});

//Inserts____________________________________________________________________________________________________________________________________________________

app.post('/api/create_tournament', (req, res)=>{
    const title = req.body.title; 
    const description = req.body.description;
    const startDate= req.body.startDate; 
    const endDate= req.body.endDate; 
    const maxParticipants= req.body.maxParticipants; 
    const user_id= req.body.user_id; 
    const game_id= req.body.game_id; 
    const startTime= req.body.startTime; 
    const viewParticipant= req.body.viewParticipant;
    const img= req.body.img;
    const imgName= req.body.imgName;
    const content = "TOURNAMENT";
    try {
        const sqlInsert = "INSERT INTO heroku_caad988da016f21.tournament(title, description, startDate, endDate, maxParticipants, user_id, game_id, startTime, viewParticipant, img, imgName, content) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [title, description, startDate, endDate, maxParticipants, user_id, game_id, startTime, viewParticipant, img, imgName, content], (err, result)=> {
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

//still need to add check for id max participants reached - consider a trigger
// app.post('/api/join_tournament', (req,res)=>{
//     const user_id = req.body.user_id;
//     const tournament_id = req.body.tournament_id;
//     try{
//         const sqlInsert = "INSERT INTO heroku_caad988da016f21.entry(user_id, tournament_id) VALUES (?,?)";
//         db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
//             if(result?.affectedRows>=1){
//                 //record successfully added to table
//                 try {
//                     const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET numParticipants = numParticipants + 1 WHERE tournament_id = ?;";
//                     db.query(sqlUpdate, [tournament_id],(err,result)=>{
//                         if (result?.affectedRows===1) {
//                             res.send(result);
//                         }else {
//                             //not updated
//                             res.send({error:301});
//                         }
//                     });
//                 } catch (err) {
//                     res.send({error:301});
//                 }
//             }else{
//                 res.send({error:301});
//             }
//         });
//     }catch(err){
//         res.send({error:301});
//     }
// });

//need to modify for adding images
app.post('/api/add_game',(req,res)=>{
    const name = req.body.name;
    const img = "link";
    const imgName = req.body.imgName;
    const content = "GAME";

    try {
        const sqlSelect = "SELECT * FROM heroku_caad988da016f21.game WHERE name = ?;";
        db.query(sqlSelect,[name],(err,result)=>{
            if (result.length===1) {
                res.send({error:301});
            } else{
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
            }
        });
    } catch (err) {
        res.send({error:301});
    }
});

//Updates________________________________________________________________________________________________________________________________________________________

app.post('/api/update_profile', (req,res)=>{
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

app.post('/api/update_tournament', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const startTime = req.body.startTime;
    const maxParticipants = req.body.maxParticipants;
    const viewParticipant = req.body.viewParticipant;

    const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET title=?, description=?, startDate=?, endDate=?, startTime=?, maxParticipants=?, viewParticipant=? WHERE tournament_id=?";
    db.query(sqlUpdate, [title, description, startDate, endDate, startTime, maxParticipants, viewParticipant, tournament_id],(err, result)=> {
        if(result?.affectedRows===1){
            res.send(result);
            console.log("update successful");
        }else{
            res.send({error:301});
        }
    });
});

//Delete_____________________________________________________________________________________________________________________________________________________

// app.post('/api/leave_tournament', (req,res)=>{
//     const user_id = req.body.user_id;
//     const tournament_id = req.body.tournament_id;
//     try{
//         const sqlInsert = "DELETE FROM heroku_caad988da016f21.entry WHERE user_id=? AND tournament_id =?";
//         db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
//             if(result?.affectedRows>=1){
//                 try {
//                     const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET numParticipants = numParticipants - 1 WHERE tournament_id = ?;";
//                     db.query(sqlUpdate, [tournament_id],(err,result)=>{
//                         if (result?.affectedRows===1) {
//                             res.send(result);
//                         }else {
//                             //not updated
//                             res.send({error:301});
//                         }
//                     });
//                 } catch (err) {
//                     res.send({error:301});
//                 }
//             }else{
//                 res.send({error:301});
//             }
//         });
//     }catch(err){
//         res.send({error:301});
//     }
// });

//consider adding a delete tournament option

app.post('/api/join_tournament', (req,res)=>{
    const user_id = req.body.user_id;
    const tournament_id = req.body.tournament_id;
    try{
        //check if the person has already joined the tournament
        const sqlSelect = "SELECT * FROM heroku_caad988da016f21.entry WHERE tournament_id =? AND user_id =?;";
        db.query(sqlSelect,[tournament_id, user_id],(err,result)=>{
            if (result.length>=1) {
                //joined - therefore leave
                try{
                    const sqlInsert = "DELETE FROM heroku_caad988da016f21.entry WHERE user_id=? AND tournament_id =?";
                    db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
                        if(result?.affectedRows>=1){
                            try {
                                const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET numParticipants = numParticipants - 1 WHERE tournament_id = ?;";
                                db.query(sqlUpdate, [tournament_id],(err,result)=>{
                                    if (result?.affectedRows===1) {
                                        res.send({"result": false});
                                    }else {
                                        //not updated
                                        res.send({error:"not updated"});
                                    }
                                });
                            } catch (err) {
                                res.send({error:"try update failed"});
                            }
                        }else{
                            res.send({error:"not deleted"});
                        }
                    });
                } catch (err) {
                    res.send({error:"try delete failed"});
                }
            } else{
                //not joined - therefore join
                try{
                    const sqlInsert = "INSERT INTO heroku_caad988da016f21.entry(user_id, tournament_id) VALUES (?,?)";
                    db.query(sqlInsert,[user_id, tournament_id],(err,result)=>{
                        if(result?.affectedRows>=1){
                            //record successfully added to table
                            try {
                                const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET numParticipants = numParticipants + 1 WHERE tournament_id = ?;";
                                db.query(sqlUpdate, [tournament_id],(err,result)=>{
                                    if (result?.affectedRows===1) {
                                        res.send({"result": true});
                                    }else {
                                        //not updated
                                        res.send({error:"update failed"});
                                    }
                                });
                            } catch (err) {
                                res.send({error:"try update failed"});
                            }
                        }else{
                            res.send({error:"insert failed"});
                        }
                    });
                }catch(err){
                    res.send({error:"try insert failed"});
                }
            }
        });
    }catch(err){
        res.send({error:301});
    }
});




//Gabriel
//Tournament state transitions
app.post('/api/end_registration', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET state = 1 WHERE tournament_id = ?;";
        db.query(sqlUpdate,[tournament_id],(err,result)=>{
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

app.post('/api/end_seeding', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET state = 2 WHERE tournament_id = ?;";
        db.query(sqlUpdate,[tournament_id],(err,result)=>{
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

app.post('/api/end_tournament', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET state = 3 WHERE tournament_id = ?;";
        db.query(sqlUpdate,[tournament_id],(err,result)=>{
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


//Seeding
//get seeds
app.post('/api/get_entrants', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    try{
        const sqlSelect = "SELECT entry.entry_id, entry.user_id, user.username, entry.seed FROM heroku_caad988da016f21.entry INNER JOIN heroku_caad988da016f21.user ON entry.user_id = user.user_id WHERE entry.tournament_id = ? ORDER BY entry_id;";
        db.query(sqlSelect,[tournament_id],(err,result)=>{
            res.send(result);
        });
    }catch(err){
        res.send({error:301});
    }
});

//update seeds
app.post('/api/set_seed', (req,res)=>{
    const seed = req.body.seed;
    const tournament_id = req.body.tournament_id;
    const username = req.body.username;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.entry SET seed = ? WHERE tournament_id = ? AND user_id = (SELECT user_id FROM heroku_caad988da016f21.user WHERE username = ?);";
        db.query(sqlUpdate,[seed, tournament_id, username],(err,result)=>{
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


//Brackets
//fetch bracket(s)
app.post('/api/get_bracketJSON', (req,res)=>{
    const tournament_id = req.body.tournament_id;
    try{
        const sqlSelect = "SELECT bracketJSON FROM heroku_caad988da016f21.tournament WHERE tournament_id = ?;";
        db.query(sqlSelect,[tournament_id],(err,result)=>{
            res.send(result);
        });
    }catch(err){
        res.send({error:301});
    }
});

//send bracket(s)
app.post('/api/send_bracketJSON', (req,res)=>{
    const tournament_json = req.body.tournament_json;
    const tournament_id = req.body.tournament_id;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET bracketJSON = ? WHERE tournament_id = ?;";
        db.query(sqlUpdate,[tournament_json, tournament_id],(err,result)=>{
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

//set winner
app.post('/api/set_winner', (req,res)=>{
    const tournament_winner = req.body.tournament_winner;
    const tournament_id = req.body.tournament_id;
    try{
        const sqlUpdate = "UPDATE heroku_caad988da016f21.tournament SET winner_username = ? WHERE tournament_id = ?;";
        db.query(sqlUpdate,[tournament_winner, tournament_id],(err,result)=>{
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

