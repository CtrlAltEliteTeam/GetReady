import React from "react";
import Login from "./Login";
import GetReady from '../../resources/img/20220826_105837_0000.png'

const LoginPage = () => {
    return(
        <div className="login-page">
            <img src={GetReady} alt="GetReady" />
            <Login/>
        </div>
    )
}

export default LoginPage