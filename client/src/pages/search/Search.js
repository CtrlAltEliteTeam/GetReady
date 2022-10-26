import React, {useContext, useState, useEffect} from "react";
import "./Search.css"
import SearchBar from "../../components/SearchBar/SearchBar";
import { GameTileData } from "../../components/GameTile/GameTileData";
import GameTile from "../../components/GameTile/GameTile";
import AuthContext from "../../api/AuthProvider";
import axios from "../../api/Axois";
import { ContactUs } from "../../components/ContactUs/ContactUs";

const TOURNAMENT_SEARCH = "/get_tournament_short";

const Search = () => {

    const [tournamentList, setTournamentList] = useState([]);

    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(TOURNAMENT_SEARCH ,{});
                console.log(response?.data);
                var data = response?.data;
                let count = 0;
                if ( tournamentList.length === 0){
                    data.forEach(element => {
                        let gameTile = new GameTileData(element.tournament_id,element.title,element.name,element.content,element.user_id,count);
                        setTournamentList(tournamentList => [...tournamentList,gameTile]);
                        count++;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return(
        <>
        <div className="spacer"></div>
        <div className="banner-tournament">TOURNAMENTS</div> 
        <div className="search-page">
            <div className="search-bar">
                <SearchBar placeholder={"Enter tournament title..."} data={tournamentList}/>
            </div>
        </div>
        {/* <div className="contact-us-search">
            <ContactUs/>
        </div> */}
        </>
    )
}

export default Search