import React, {useState, useContext, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import  AuthContext from "../../api/AuthProvider";
import { LOGIN, LOGOUT } from "../../api/Constants";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import {NavbarData} from './NavbarData';
import './Navbar.css'
import LoginButton from '../LoginButton/LoginButton';

const NavBar = () => {

    //const [state, dispatch] = useContext(AuthContext);
    let navigate = useNavigate();

    const [menubar, setMenubar] = useState(false);
    const showMenubar = () => setMenubar(!menubar);
    const [pageHeading, setPageHeading] = useState('Get Ready');
    const [loginName, setLoginName] = useState('Login');

    const { auth } = useContext(AuthContext)

    //console.log( auth.user_id );

    // useEffect(() => {
    //     console.log(state.loggedin);
    //         if(auth.user_id != null){
    //             setLoginName('Log Out');
    //         }
    //         else {
    //             setLoginName('Login');
    //         }
    // },[auth.user_id]);

    // const loginCheck = () =>{
    //     if(auth.user_id != null){
    //         setLoginName('Login');
    //         setAuth({});
    //     } else {
    //         setLoginName('Logout');
    //         return navigate(`/login`);
    //     }
    //     return navigate(`/login`);
    // };


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
                        <LoginButton/>
                </div>
                <nav className={menubar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showMenubar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {NavbarData.map((item, index) => { 
                        if (item.show == true)
                            return (
                                <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                                </li>
                            );
                        else if (item.show == false && auth.user_id != 0)
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