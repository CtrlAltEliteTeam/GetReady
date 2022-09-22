import { createContext, useReducer } from "react";
import { LOGIN, LOGOUT, TITLE } from "./Constants"

export const AuthContext = createContext();

const { Provider } = AuthContext;

const initialState = {
    id : 0,
    loggedin : false,
    heading : "Get Ready"
}

function reducer(state,action){
    switch(action.type){
        case LOGIN:
            return {
                id : action.payload,
                loggedin : true,
            }
        case LOGOUT:
            return {
                id : action.payload,
                loggedin : false
            }
        case TITLE:
            return {
                heading : action.payload
            }
        default:
            throw new Error();
    }
}

export default function StoreProvider(props) {
    const [state,dispatch] = useReducer(reducer, initialState);
    return <Provider value={[state,dispatch]}>{props.children}</Provider>
}
