import React, { useEffect, useState } from 'react';
import Seeds from './Seeds';
import axios from '../../api/Axois';
import './Seeding.css';

const GET_ENTRANTS_URL = "/get_entrants";

function TournamentBracket({tournament_id, setState}){
    const [seeds, setSeeds] = useState(new Map());
    
    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(GET_ENTRANTS_URL,{
                    tournament_id : tournament_id,
                });


                var newSeeds = new Map();
                var flag = false;
                for(let i = 0; i < response?.data.length; i++){
                    var row = response?.data[i];

                    if(row.seed==null || !Number.isInteger(row.seed)){
                        flag = true;
                        break;
                    }
                    newSeeds.set(parseInt(row.seed), row.username);
                }

                if(flag){
                    //manually make seeds
                    newSeeds.clear();
                    for(let i = 0; i < response?.data.length; i++){
                        var row = response?.data[i];
                        newSeeds.set(i, row.username);
                    }
                }
                setSeeds(newSeeds);

            } catch (error) {
                //console.log(error);
            }
        }
        fetchData();
    }, [])


    const [viewSeeds, setViewSeeds] = useState(false);
    const showSeeds = (e)=>{
        if(viewSeeds){
            setViewSeeds(false);
        }
        if(!viewSeeds){
            setViewSeeds(true);
        }
    }



    return(
        <div>
            {viewSeeds ? (  
                <div className='seed-outter'>
                    <div className='tournament-bracket-closeBtn' onClick={showSeeds}>&times;</div>
                    <Seeds seeds={seeds} setSeeds={setSeeds} viewSeeds={viewSeeds} setViewSeeds={setViewSeeds} tournament_id={tournament_id} setState={setState}/>
                </div>
                ):( 
                <div>
                    <div className="tournament-bracket-btn" onClick={showSeeds}>View Seeds</div>
                </div>
            )}        
        </div>
    )
}
export default TournamentBracket