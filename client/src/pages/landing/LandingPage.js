import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../api/AuthProvider";
import { GameTileData } from "../../components/GameTile/GameTileData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import GetReady from '../../resources/img/GetReady.png';
import './LandingPage.css';
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../api/Constants";



const LandingPage = () => {

    let navigate = useNavigate();
    // Array of Tounaments
    const [loginName, setLoginName] = useState('Login');
    const [state,dispatch]=useContext(AuthContext);

    const [featuredList, setFeaturedList] = useState([]);
    const [featuredName, setFeaturedName] = useState("Featured Tournaments");

    const [gamesList, setGamesList] = useState([]);
    const [gamesListName, setGamesListName] = useState("Popular Games");

    useEffect(() => {
        //Axios function to load the data into GameTileData objects 

    }, [])

    // useEffect(() => {
    // //console.log(state.loggedin);
    //     if(state.loggedin){
    //         setLoginName('Log Out');
    //         //setViewDash(true);
    //     }
    //     if(!state.loggedin){
    //         setLoginName('Login');
    //         //setViewDash(false);
    //     }
    // },[loginName]);
        
    let count =0;

    //Load data of games
    useEffect(() => {
        if ( gamesList.length == 0){
            GameTile_TestData.forEach(element => {
                console.log(JSON.stringify(element));
                let gameTile = new GameTileData(element.id,element.name,element.img,element.alt,count,element.content,element.user);
                setGamesList(gamesList => [...gamesList,gameTile]);
                count++;
            });
        }
    }, [])

    useEffect(() => {
        if ( featuredList.length == 0){
            GameTile_TestData.forEach(element => {
                let gameTile = new GameTileData(element.id,element.name,element.img,element.alt,count);
                setFeaturedList(featuredList => [...featuredList,gameTile]);
                count++;
            });
        }
    }, [])

    // const loginCheck = () =>{
    //     if(state.loggedin){

    //         dispatch({
    //             type:LOGOUT,
    //             payload: 0
    //         });
    //         setLoginName('Login');
    //     }
    //     if(!state.loggedin){
    //         return navigate(`/login`);
    //     }
    // };


    return (
        <>
        <div className="spacer"></div>
        <div className="landing-page">
            <div className="games-list-outer">
                <div className="games-list-heading">
                    {gamesListName}
                </div>
                <div className="games-list-inner">
                    {gamesList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
            <div className="tourny-list-outer">
                <div  className="games-list-heading">
                    {featuredName}
                </div>
                <div className="tourny-list-inner">
                    {featuredList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage