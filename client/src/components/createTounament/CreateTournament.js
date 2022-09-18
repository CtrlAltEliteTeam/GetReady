import React, {useState, useEffect, useContext} from "react";
import "./CreateTournament.css";
import Select from "react-dropdown-select";

const CreateTournament = () => {

    const [tName, setTName] = useState('');
    const [tGame, setTGame] = useState("");
    const [tsDate, setTsDate] = useState("");
    const [tfDate, setTfDate] = useState("");
    const [tParticipants, setTParticipants] = useState(2);
    const [tDesc, setTDesc] = useState("");
    const [tsTime, setTsTime] = useState("");

    const options = [{id:1,name:"Counter Strike: GO"},{id:2,name:"Fortnite"}]//,"Fortnite","Halo","League of Legends","Super Smash Bros"];

    useEffect(() => {
        console.log(tGame);
    }, [tGame])

    const handleSubmit = async (e) => {
        e.preventDeafault();
    }
    
    return(
        <section className="create-tounament-outer">
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <input
                    type="name"
                    id="tname"
                    placeholder="Tounament Name"
                    value={tName}
                    onChange={(e) => setTName(e.target.value)}
                    required
                />
                <select
                    value={tGame}
                    onChange={(e) => setTGame(e.target.value)}
                >
                    {options.map(({ id, name }, index) => <option value={id} >{name}</option>)}
                </select>
                <input
                    type="date"
                    id="tsdate"
                    value={tsDate}
                    onChange={(e) => setTsDate(e.target.value)}
                    required
                    placeholder="Tounament Name"
                />
                <input
                    type="time"
                    id="tstime"
                    value={tsTime}
                    required
                    onChange={(e) => setTsTime(e.target.value)}
                />
                <input
                    type="date"
                    id="tfdate"
                    value={tfDate}
                    required
                    onChange={(e) => setTfDate(e.target.value)}
                />
                <input
                    type="number"
                    id="tstime"
                    value={tParticipants}
                    required
                    onChange={(e) => setTParticipants(e.target.value)}
                />
                <textarea
                    type="time"
                    id="tstime"
                    value={tDesc}
                    onChange={(e) => setTDesc(e.target.value)}
                    required
                />
                <button>

                </button>
            </form>
        </section>
    )
}

export default CreateTournament