import React, {useState, useContext, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AuthContext } from "../../api/AuthProvider";
import { LOGOUT } from "../../api/Constants";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import {NavbarData} from './NavbarData';
import './Navbar.css'

const NavBar = () => {

    const [state, dispatch] = useContext(AuthContext);
    let navigate = useNavigate();

    const [menubar, setMenubar] = useState(false);
    const showMenubar = () => setMenubar(!menubar);
    const [pageHeading, setPageHeading] = useState('Tournaments');
    const [loginName, setLoginName] = useState('Login');

    useEffect(() => {
        console.log(state.loggedin);
            if(state.loggedin){
                setLoginName('Log Out');
            }
            if(!state.loggedin){
                setLoginName('Login');
            }
    },[loginName]);

    const loginCheck = () =>{
        if(state.loggedin){

            dispatch({
                type:LOGOUT,
                payload: 0
            });
            setLoginName('Login');
        }
        if(!state.loggedin){
            return navigate(`/login`);
        }
    };


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showMenubar} />
                    </Link>
                    <div className="page-heading">
                        {pageHeading}
                    </div>
                    <div  className="landing-login-button" onClick={loginCheck}>
                    {loginName}
                    </div>
                </div>
                <nav className={menubar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showMenubar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {NavbarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                    })}
                </ul>
                </nav>
            </IconContext.Provider>
        </>
    );

}
export default NavBar