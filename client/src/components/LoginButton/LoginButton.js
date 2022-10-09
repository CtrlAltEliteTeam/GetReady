import React, {useState, useEffect, useContext} from 'react'
import { matchPath, useNavigate, useLocation } from 'react-router-dom'
import AuthContext from '../../api/AuthProvider';
import './LoginButton.css';

const PATH = '/login/*';

const LoginButton = () => {

    const { auth, setAuth } = useContext(AuthContext);
    let navigate = useNavigate();

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [loginName, setLoginName] = useState('Log in');

    const [showSignupButton, setShowSignupButton] = useState(true);

    const {pathname} = useLocation();
    //console.log(pathname);
    useEffect(() => {
        const match = matchPath("/login/*",pathname);
        if (match != null) {
            setShowLoginButton(false);
            setShowSignupButton(false);
        } else {
            setShowLoginButton(true);
            setShowSignupButton(true);
        }
    });

    useEffect(() => {
        console.log(auth.user_id);
            if(auth.user_id != 0){
                setLoginName('Log Out');
                setShowSignupButton(false);
            }
            else {
                setLoginName('Login');
                setShowSignupButton(true);
            }
    },[auth.user_id]);

    useEffect(() => {
            if(auth.user_id != 0){
                setLoginName('Log Out');
                setShowSignupButton(false);
            }
            else {
                setLoginName('Login');
                setShowSignupButton(true);
            }
    },[auth.user_id]);

    const loginCheck = () => {
        if(auth.user_id != 0){
            setLoginName('Login');
            setAuth({ user_id : 0});
        } else {
            return navigate(`/login/login`);
        }
    };

    const signupClick = () => {
        return navigate(`/login/signup`);
    }

    return (
        <>
            <div className={showLoginButton ? "login-button-button-show" : "login-button-button"}>
                <div  className="login-button-button-button" onClick={loginCheck}>{loginName}</div>
            </div>
            <div className={showSignupButton ? "signup-button-button-show" : "signup-button-button"}>
                <div  className="signup-button-button-button" onClick={signupClick}>Signup</div>
            </div>
        </>
    )
}

export default LoginButton