import React, {useEffect, useRef, useState, useContext} from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import "./Login.css";
import axios from '../../api/Axois';
import { AuthContext } from '../../api/AuthProvider';
import {LOGIN} from '../../api/Constants';
import {useNavigate} from 'react-router-dom';

const LOGIN_URL = '/login';

/* TODO :
        - create state that stores the users Username and other essential info returned byu server
 */


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [state, dispatch] = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [user, setUser]=useState([]);

    useEffect(() => {
        userRef.current.focus();
        //console.log(JSON.stringify(user));
    }, [])

    useEffect(() => {
        setErrMsg('');
        
    }, [email, pwd])
let navigate = useNavigate();
    useEffect(()=>{
        
        if(success){
           return navigate(`/`);

        }
    },[success]);

    const handleSubmit = async (e) => { //button press
        e.preventDefault();

        try {
            const response = await axios.get(LOGIN_URL,{params:{
                    email:email,
                    password:pwd
                }});
            if(response?.data?.login === 301){
                setErrMsg('Incorrect Username or Password');
            } else {
                const user_id = response?.data?.user_id;
                setEmail('');
                setPwd('');
                dispatch({
                    type: LOGIN,
                    payload : user_id,
                });
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }

        //Axios rough work
        // try {
        //     const response = await axios.get(LOGIN_URL,{params:{ email: email, password: pwd }}); //change to whatever email and passwprd called on backend
        //     if(response?.data?.login === 301){
        //         setErrMsg('Incorrect Username or Password');
        //     }
        //     else {
        //         const user_id = response?.data?.user_id;
        //         setEmail('');
        //         setPwd('');
        //         setSuccess(true);
        //     }
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err?.response?.data?.login === 301) { //setup error coded for failed login
        //         setErrMsg('Incorrect Username or Password');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }
    }

    

    return (
        <>
            {success ? (
                <section >
                    {/*change to landing page URL*/}
                </section>
            ) : (
                <section className='login-box'>
                    <div className='login-heading'>
                        Welcome
                    </div>
                    <div className='login-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='login-field'>
                                <div className='login-icon'>
                                    <BsIcons.BsFillPersonFill/>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Email Adress'
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </div>
                            <div className='login-field'>
                                <div className='login-icon'>
                                    <RiIcons.RiLockPasswordLine className='login-icon'/>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Password'
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </div>
                            <div className='login-button'>
                                <button type='login'>Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className='login-link'>
                        Need an Account? 
                        <span>
                            <Link to='/signup'>
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login