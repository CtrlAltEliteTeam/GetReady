import { createContext, useState } from "react";

const TournamentContext = createContext({});

export const TournamentState = ({ children }) => {
    const [data, setData] = useState({});

    return (
        <TournamentContext.Provider value={{ data, setData }}>
            {children}
        </TournamentContext.Provider>
    )
}

export default TournamentContext;