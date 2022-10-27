import React from 'react'
import { BsFillCaretUpFill as UpArrow, BsFillCaretDownFill as DownArrow} from "react-icons/bs"

const Seed = ({seeds, setSeeds, seed, entrant}) => {
    const handleUp = event => {
        if(seed!=0){
            //swap with entry above
            var newSeeds = new Map(seeds);

            var highTemp = newSeeds.get(seed-1);
            newSeeds.set(seed-1, entrant);
            newSeeds.set(seed, highTemp);
            
            setSeeds(newSeeds);
        }
    };

    const handleDown = event => {
        if(seed!=seeds.size-1){
            //swap with entry below
            var newSeeds = new Map(seeds);

            var lowTemp = newSeeds.get(seed+1);
            newSeeds.set(seed+1, entrant);
            newSeeds.set(seed, lowTemp);

            setSeeds(newSeeds);
        }
    };


    
    return (
        <div className='seed'>
            <div className="seedID">{seed}</div>
            <div className='seedArrows'>
                <div className='seedArrow' onClick={handleUp}>
                    <UpArrow size={25}/>
                </div>
                <div className='seedArrow' onClick={handleDown}>
                    <DownArrow size={25}/>
                </div>
            </div>
            <div className="seedName">{entrant}</div>   
            <div className="clear"/> 
        </div>
    )
}

export default Seed
