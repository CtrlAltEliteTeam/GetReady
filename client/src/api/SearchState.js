import { createContext, useState } from "react";

const SearchContext = createContext({});

export const SearchState = ({ children }) => {
    const [search, setSearch] = useState(0);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;