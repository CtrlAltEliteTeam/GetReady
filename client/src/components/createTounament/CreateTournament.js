import React, {useState, useEffect, useContext} from "react";
import "./CreateTournament.css";
import Select from "react-dropdown-select";

const CreateTournament = () => {

    const [tName, setTName] = useState('');
    const [validTName, setValidTName] = useState(false);

    const [tGame, setTGame] = useState("");
    const [validTGame, setValidTGame] = useState(false);
    
    const [tsDate, setTsDate] = useState("");
    const [validTsDate, setValidTsDate] = useState(false);

    const [tfDate, setTfDate] = useState("");
    const [validTfDate, setValidTfDate] = useState(false);

    const [tParticipants, setTParticipants] = useState(2);
    const [validTParticipants, setValidTParticipants] = useState(false);
    
    const [tDesc, setTDesc] = useState("");
    const [validTDesc, setValidTDesc] = useState(false);
    
    const [tsTime, setTsTime] = useState("");
    const [validTsTime, setValidTsTime] = useState(false);

    const options = [{id:1,name:"Counter Strike: GO"},{id:2,name:"Fortnite"}]//,"Fortnite","Halo","League of Legends","Super Smash Bros"];

    useEffect(() => {
        console.log(tGame);
    }, [tGame])

    //get game data
    

    const handleSubmit = async (e) => {
        e.preventDeafault();
        //send created game
    }
    
    return(
        <section className="create-tounament-inner">
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className="create-form-title">
                    <span>
                        Tournament Details
                    </span>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Tounament Name
                    </div>
                    <div className="create-item-input">
                        <input
                            type="name"
                            id="tname"
                            placeholder="Tounament Name"
                            value={tName}
                            onChange={(e) => setTName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Game that will be played
                    </div>
                    <div className="create-item-input">
                        <select
                            value={tGame}
                            onChange={(e) => setTGame(e.target.value)}
                        >
                            {options.map(({ id, name }, index) => <option value={id} >{name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Start Date
                    </div>
                    <div className="create-item-input">
                        <input
                            type="date"
                            id="tsdate"
                            value={tsDate}
                            onChange={(e) => setTsDate(e.target.value)}
                            required
                            placeholder="Tounament Name"
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Start Time
                    </div>
                    <div className="create-item-input">
                        <input
                            type="time"
                            id="tstime"
                            value={tsTime}
                            required
                            onChange={(e) => setTsTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        End Date
                    </div>
                    <div className="create-item-input">
                        <input
                            type="date"
                            id="tfdate"
                            value={tfDate}
                            required
                            onChange={(e) => setTfDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Number of Participants
                    </div>
                    <div className="create-item-input">
                        <input
                            type="number"
                            id="tstime"
                            value={tParticipants}
                            required
                            onChange={(e) => setTParticipants(e.target.value)}
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-heading">
                        Tounament Info
                    </div>
                    <div className="create-item-input">
                        <textarea
                            type="info"
                            id="tdesc"
                            value={tDesc}
                            onChange={(e) => setTDesc(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="create-item">
                    <div className="create-item-button">
                        <button>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CreateTournament