import React, {useState} from 'react';
import "./SearchBar.css";
import * as FcIcons from 'react-icons/fc';
import * as IoIcons from 'react-icons/io';
import GameTile from "../../components/GameTile/GameTile";

function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [barValue, setBarValue] = useState("");

    const handleFilter = (event) => {
        const searchString = event.target.value;
        setBarValue(searchString);
        const newFilter = data.filter((value) => {
            return value.game.toLowerCase().includes(searchString.toLowerCase());
        });
        if (searchString === ""){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setBarValue("");
        setFilteredData([]);
    }

    return (
        <div className="search">
            <div className="searchInput"> 
            <input 
                type="text" 
                placeholder={placeholder} value={barValue} onChange={handleFilter}
            /> 
            <div className="searchIcon">
                {barValue.length == 0 ? <FcIcons.FcSearch/> : <IoIcons.IoMdCloseCircleOutline id="clearBtn" onClick={clearInput}/>}
            </div>
        </div>
        {filteredData.length != 0 &&(
        <div className="dataResult">
            {filteredData.map((element) => {
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

