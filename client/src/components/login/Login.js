import React, {useEffect, useRef, useState} from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import { Link,Redirect } from 'react-router-dom';
import "./Login.css";

const LOGIN_URL = '';

/* TODO :
        - create state that stores the users Username and other essential info returned byu server
 */


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => { //button press
        e.preventDefault();
        try {
            const response = await axios.get(LOGIN_URL,{params:{ email: email, password: pwd }}); //change to whatever email and passwprd called on backend
            if(response?.data?.login === 301){
                setErrMsg('Incorrect Username or Password');
            }
            else {
                // const user_id = response?.data?.user_id;
                // setEmail('');
                // setPwd('');
                // setSuccess(true);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response?.data?.login === 301) { //setup error coded for failed login
                setErrMsg('Incorrect Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Redirect to='/landing'/> {/*change to landing page URL*/}
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <BsIcons.BsFillPersonFill className='input-icon'/>
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
                        <RiIcons.RiLockPasswordLine className='input-icon'/>
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span>
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login
