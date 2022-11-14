import React, {useState, useEffect, useContext} from 'react';
import "./SearchBar.css";
import * as FcIcons from 'react-icons/fc';
import * as IoIcons from 'react-icons/io';
import GameTile from "../../components/GameTile/GameTile";
import SearchContext from '../../api/SearchState';

function SearchBar({placeholder, data}) {

    const {search, setSearch} = useContext(SearchContext);

    const [filteredData, setFilteredData] = useState([]);
    const [barValue, setBarValue] = useState("");
    const [filter, setFilter] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);

    const handleFilter = (event) => {
        const searchString = event.target.value;
        setBarValue(searchString);
        //default filter to tournament name
        let newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchString.toLowerCase());
            
        });

        if (filter == "Game") {
                newFilter = data.filter((value) => {
                return value.game.toLowerCase().includes(searchString.toLowerCase());
            });
        } 

        //if search string is empty show all tournaments
        if (searchString === "") {
            setFilteredData(data);
        } else {
            setFilteredData(newFilter);
        }
        setIsFiltered(true);
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
        clearInput();
        //console.log(category);
    }

    const clearInput = () => {
        setBarValue("");
        setFilteredData(data);
    }

    useEffect(() => {
        console.log(data);
        let searchString = "";
        if(search != 0 ){
            searchString = search;
            setBarValue(search);
            setFilter("Game");
            setSearch(0);
        } else {
            searchString = barValue;
        }
        let newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchString.toLowerCase());
        });

        //filter all tournaments by game searched
        if (filter == "Game") {
                newFilter = data.filter((value) => {
                return value.game.toLowerCase().includes(searchString.toLowerCase());
            });
        } 
        if (searchString === "") {
            setFilteredData(data);
        } else {
            setFilteredData(newFilter);
        }
        setIsFiltered(true);
    }, [barValue,data])

    return (
        <div className="search">
            <div className="searchInput"> 
                <div className="dropdown">
                    <select className="filter" value={filter} onChange={event => handleFilterChange(event.target.value)}>
                        <option id="0" className="option">Tournament Title</option>
                        <option id="1" className="option">Game</option>
                    </select>
                </div>
                <div className="input">
                    <input 
                        type="text" 
                        placeholder={placeholder} value={barValue} 
                        onChange={(e) => setBarValue(e.target.value)}
                    /> 
                </div>
                <div className="searchIcon">
                    {barValue.length == 0 ? <FcIcons.FcSearch/> : <IoIcons.IoMdCloseCircleOutline id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            {isFiltered ? (
                <div className="dataResult">
                    {filteredData.map((element) => {
                        return (
                            <div key={element.id}> 
                                <GameTile game={element}/>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="dataResult">
                    {data.map((element) => {
                        return (
                            <div key={element.id}> 
                                <GameTile game={element}/>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar