import React from "react";
import Login from "./Login";
import GetReady from '../../resources/img/GetReady.jpg'

const LoginPage = () => {
    return(
        <div>
            <img src={GetReady} alt="GetReady"/>
            <Login/>
        </div>
    )
}

export default LoginPage