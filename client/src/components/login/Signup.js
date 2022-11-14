import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import './Login.css';
import AuthContext from '../../api/AuthProvider';
import { LOGIN } from '../../api/Constants';
import axios from '../../api/Axois';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = '/register'; //Register URL

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    let navigate = useNavigate();

    //const [state,dispatch] = useContext(AuthContext);
    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setVaildEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    //validation for new user
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setVaildEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(()=>{        
        if(success){
            return navigate(`/`);
        }
    },[success]);


    //checks if a user already exsists and if not creates a user if one does exsist error messages are displayed
    const handleSubmit = async (e) => {
        e.preventDefault();
        // prevents button hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,{username: user, email : email, password :pwd });
            console.log(JSON.stringify(response?.data));
            if (response?.data?.error === 301) {
                setErrMsg('Username Taken');           
            // } else if (response?.data?.email_availability === 301) {
            //     setErrMsg('Email Taken');
            } else {  
                //On sucess 
                const user_id = response?.data?.insertId;
                const username = response?.data?.username;
                setAuth({ user_id, username});
                setUser('');
                setPwd('');
                setEmail('');
                setMatchPwd('');
                setSuccess(true);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    {/* Change to landing URL */}
                </section>
            ) : (
                <div>
                    <section className='login-box'>
                        <div className='login-heading'>
                            Register
                        </div>
                        <div className='login-form'>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <form onSubmit={handleSubmit}>
                                {/* UserName */}
                                <div className='signup-field'>
                                    <div className='login-icon'>
                                        <BsIcons.BsFillPersonFill/>
                                    </div>
                                    <input 
                                        type="text"
                                        id="username"
                                        placeholder='User Name'
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                    <FaIcons.FaCheck className={validName ? "valid" : "hide"} />
                                    <FaIcons.FaTimes className={validName || !user ? "hide" : "invalid"} />
                                    <span className='signup-info'>
                                        <FaIcons.FaInfoCircle />
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </span>

                                </div>

                                {/* Email adress */}
                                <div className='signup-field'>
                                    <div className='login-icon'>
                                        <MdIcons.MdOutlineMailOutline />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        autoComplete="off"
                                        placeholder='Email Adress'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <FaIcons.FaCheck className={validEmail ? "valid" : "hide"} />
                                    <FaIcons.FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                                    <span className='signup-info'>
                                        <FaIcons.FaInfoCircle />
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </span>
                                </div>

                                {/* Password */}
                                <div className='signup-field'>
                                    <div className='login-icon'>
                                        <RiIcons.RiLockPasswordLine />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder='Password'
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    <FaIcons.FaCheck className={validPwd ? "valid" : "hide"} />
                                    <FaIcons.FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
                                    <span className='signup-info'>
                                        <FaIcons.FaInfoCircle />
                                            8 to 24 characters.<br />
                                            Must include uppercase and lowercase letters, a number and a special character.<br />
                                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </span>
                                </div>

                                {/* Match Password */}
                                <div className='signup-field'>
                                        <div className='login-icon'>
                                            <RiIcons.RiLockPasswordLine />
                                        </div>
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        placeholder='Confirm Password'
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <FaIcons.FaCheck className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FaIcons.FaTimes className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                    <span className='signup-info'>
                                        <FaIcons.FaInfoCircle />
                                        Must match the first password input field.
                                    </span>
                                </div>

                                {/* Button : when pressed handle event is run */}
                                <div className='login-button'>
                                    <button disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false} type='login'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className='login-link'>
                            Already registered?
                            <span>
                                <Link className="sign-up-link" to='/login/login'>
                                    Login
                                </Link>
                            </span>
                        </div>
                    </section>
                </div>
                
            )}
        </>
    )
}

export default Signup