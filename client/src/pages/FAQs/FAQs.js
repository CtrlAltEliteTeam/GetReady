import React, {useContext, useState, useEffect} from "react";
import "./FAQs.css"
import SearchBar from "../../components/SearchBar/SearchBar";
import { GameTileData } from "../../components/GameTile/GameTileData";
import GameTile from "../../components/GameTile/GameTile";
import AuthContext from "../../api/AuthProvider";
import axios from "../../api/Axois";

const Search = () => {

    return(
        <>
        <div className="spacer"></div>
        <div className="faqs-page">
            
        </div>
        </>
    )
}

export default Search