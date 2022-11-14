import { createContext, useState } from "react";

const AuthContext = createContext({});

//wrapper for the app that allows all children to have access to the current users id and username

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user_id:0});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
