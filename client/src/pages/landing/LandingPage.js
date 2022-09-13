import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../api/AuthProvider";
import { GameTileData } from "../../components/GameTile/GameTitleData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import GetReady from '../../resources/img/GetReady.png';
import './LandingPage.css';
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../api/Constants";



const LandingPage = () => {

    let navigate = useNavigate();
    // Array of Tounaments
    const [tournamentList, setTournamentList] = useState([]);
    const [loginName, setLoginName] = useState('Login');
    const [state,dispatch]=useContext(AuthContext);
    const [viewDash, setViewDash] = useState(false);

    useEffect(() => {
        //Axios function to load the data into GameTileData objects 

    }, [])

    useEffect(() => {
    console.log(state.loggedin);
        if(state.loggedin){
            setLoginName('Log Out');
            setViewDash(true);
        }
        if(!state.loggedin){
            setLoginName('Login');
            setViewDash(false);
        }
    },[loginName]);
        

    //Load sample data 
    useEffect(() => {
        GameTile_TestData.forEach(element => {
            let gameTile = new GameTileData(element.id,element.name,element.img,element.alt);
            setTournamentList(tournamentList => [...tournamentList,gameTile]);
        });
    }, [])

    const loginCheck = () =>{
        if(state.loggedin){

            dispatch({
                type:LOGOUT,
                payload: 0
            });
            setLoginName('Login');
        }
        if(!state.loggedin){
            return navigate(`/login`);
        }
    };

    const viewDashboard = () => {
        return navigate(`/dashboard`);
    }


    return (
        <div className="landing-page">
            <div className="tourny-list-outer">
                <div className="landing-button-container">
                    <div className={viewDash ? 'view-dash-button-valid' : 'view-dash-button-invalid' } onClick={viewDashboard}>
                        View Your Dashboard
                    </div>
                </div>
                <div className="tourny-list-inner">
                    {tournamentList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LandingPage