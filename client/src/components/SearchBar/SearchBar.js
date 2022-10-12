import React, {useState} from 'react';
import "./SearchBar.css";
import * as FcIcons from 'react-icons/fc';
import * as IoIcons from 'react-icons/io';
import GameTile from "../../components/GameTile/GameTile";

function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [barValue, setBarValue] = useState("");
    const [filter, setFilter] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);

    const handleFilter = (event) => {
        const searchString = event.target.value;
        setBarValue(searchString);
        let newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchString.toLowerCase());
        });
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

    return (
        <div className="search">
            <div className="searchInput"> 
                <div className="dropdown">
                    <select className="filter" value={filter} onChange={event => handleFilterChange(event.target.value)}>
                        <option id="0" >Tournament Title</option>
                        <option id="1" >Game</option>
                    </select>
                </div>
                <div className="input">
                    <input 
                        type="text" 
                        placeholder={placeholder} value={barValue} onChange={handleFilter}
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

