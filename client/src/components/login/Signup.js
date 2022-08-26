import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
//import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import './Login.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = ''; //Register URL

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

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

        //Axios rough work
        // try {
        //     const response = await axios.get(REGISTER_URL,{params:{ username: user, email : email, pwd :pwd }});
        //     if (response?.data?.username_availability === 301) {
        //         setErrMsg('Username Taken');           
        //     } else if (response?.data?.email_availability === 301) {
        //         setErrMsg('Email Taken');
        //     } else {  
        //         On sucess             
        //         setUser('');
        //         setPwd('');
        //         setEmail('');
        //         setMatchPwd('');
        //         setSuccess(true);
        //     }
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else {
        //         setErrMsg('Registration Failed')
        //     }
        //     errRef.current.focus();
        // }
    }

    return (
        <>
            {success ? (
                <section>
                    {/* Change to landing URL */}
                </section>
            ) : (
                <section>
                    {/* UserName */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <BsIcons.BsFillPersonFill className='input-icon'/>
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
                        <FaIcons.FaCheck className={validEmail ? "valid" : "hide"} />
                        <FaIcons.FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FaIcons.FaInfoCircle />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        {/* Email adress */}
                        <MdIcons.MdOutlineMailOutline className='input-icon'/>
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
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FaIcons.FaInfoCircle />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        {/* Password */}
                        <RiIcons.RiLockPasswordLine className='input-icon'/>
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
                        <FaIcons.FaCheck className={validEmail ? "valid" : "hide"} />
                        <FaIcons.FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FaIcons.FaInfoCircle />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        {/* Match Password */}
                        <RiIcons.RiLockPasswordLine className='input-icon'/>
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
                        <FaIcons.FaCheck className={validEmail ? "valid" : "hide"} />
                        <FaIcons.FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FaIcons.FaInfoCircle />
                            Must match the first password input field.
                        </p>

                        {/* Button : when pressed handle event is run */}
                        <button disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>

                    <p>
                        Already registered?<br />
                        <span>
                            <Link to='/login'>
                                Login
                            </Link>
                        </span>
                    </p>

                </section>
            )}
        </>
    )
}

export default Signup