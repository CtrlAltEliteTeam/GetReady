import React, {useState, useContext} from "react";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AuthContext } from "../../api/AuthProvider";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import {NavbarData} from './NavbarData';
import './Navbar.css'

const NavBar = () => {

    const [menubar, setMenubar] = useState(false);
    const showMenubar = () => setMenubar(!menubar);
    const [pageHeading, setPageHeading] = useState('Tournaments');

    const [state] = useContext(AuthContext);

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