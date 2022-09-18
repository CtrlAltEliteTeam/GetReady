import React, {useState, useEffect, useContext} from "react";
import "./CreateTournament.css";
import Select from "react-dropdown-select";

const CreateTournament = () => {

    const [tName, setTName] = useState('');
    const [tGame, setTGame] = useState([]);

    let options = [{id:1,name:"Counter Strike: GO"}]//,"Fortnite","Halo","League of Legends","Super Smash Bros"];

    return(
        <div className="create-tounament-outer">
            <form>
                <input
                    type="tname"
                    id="tname"
                    placeholder="Tounament Name"
                    value={tName}
                    onChange={(e) => setTName(e.target.value)}
                    required
                />
                <Select options={options} onChange={(values) => this.setTGame(values)} />
            </form>
        </div>
    )
}

export default CreateTournament