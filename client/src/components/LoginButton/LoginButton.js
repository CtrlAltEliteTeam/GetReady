import React, {useState, useEffect} from 'react'
import './LoginButton.css';

const PATH = '/login/*';

const LoginButton = (params) => {

    //const { auth, setAuth } = useContext(AuthContext);
    //let navigate = useNavigate();
    const [auth,setAuth] = useState(params.params);

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [loginName, setLoginName] = useState('Log in');

    const [showSignupButton, setShowSignupButton] = useState(true);

    const [showLoginButtons, setShowLoginButtons] = useState(true);

    //this needs its own var
    //const {pathname} = useLocation();
    useEffect(() => {
        //const match = matchPath("/login/*",pathname);
        const match = params.params.path;
        if (match === '/login/') {
            setShowLoginButtons(false);
        } else {
            setShowLoginButtons(true);
        }
    },[params]);

    useEffect(() => {
        //console.log(auth.user_id);
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
            return (`/login/login`);
        }
    };

    const signupClick = () => {
        //return navigate(`/login/signup`);
    }

    return (
        <>
            <div className={showLoginButtons ? 'login-button-button-container-show' : 'login-button-button-container'}>
                <div className={showLoginButton ? "login-button-button-show" : "login-button-button"}>
                    <div  className="login-button-button-button" onClick={loginCheck} data-testid="LoginButton" >{loginName}</div>
                </div>
                <div className={showSignupButton ? "signup-button-button-show" : "signup-button-button"}>
                    <div  className="signup-button-button-button" onClick={signupClick}>Signup</div>
                </div>
            </div>
        </>
    )
}

export default LoginButton