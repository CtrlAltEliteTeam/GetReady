import React, {useEffect, useRef, useState, useContext} from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import "./Login.css";
import axios from '../../api/Axois';
import AuthContext from '../../api/AuthProvider';
import {LOGIN} from '../../api/Constants';
import {useNavigate} from 'react-router-dom';

const LOGIN_URL = '/login';

/* TODO :
        - create state that stores the users Username and other essential info returned byu server
 */


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    let navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

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

    useEffect(()=>{
        
        if(success){
            return navigate(`/`);
        }
    },[success]);

    const handleSubmit = async (e) => { //button press
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,{
                    email:email,
                    password:pwd
                });
                console.log(JSON.stringify(response));
            if(response?.data?.error === 301){
                setErrMsg('Incorrect Username or Password');
            } else {
                const user_id = response?.data[0]?.user_id;
                const username = response?.data[0]?.username;
                setEmail('');
                setPwd('');
                console.log("before dispatch " + response?.data[0]?.user_id);
                setAuth({ user_id, username});
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }

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
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
                            </div>
                            <div className='login-button'>
                                <button type='login'>Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className='login-link'>
                        Need an Account? 
                        <span>
                            <Link to='/login/signup'>
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
