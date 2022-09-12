import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as CgIcons from 'react-icons/cg';
import * as AiIcons from 'react-icons/ai';

export const NavbarData = [
    {
        title:"Featured",
        path:'/',
        icon:<BiIcons.BiTrendingUp />,
        cName:'nav-text'
    },
    {
        title:"Tourmanents",
        path:'/',
        icon:<AiIcons.AiOutlineHome />,
        cName:'nav-text'
    },
    {
        title:"Your Page",
        path:'/',
        icon:<AiIcons.AiOutlineProfile />,
        cName:'nav-text'
    },
    {
        title:"Profile",
        path:'/',
        icon:<CgIcons.CgProfile />,
        cName:'nav-text'
    },
];