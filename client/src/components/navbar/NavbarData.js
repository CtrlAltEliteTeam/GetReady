import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as CgIcons from 'react-icons/cg';
import * as AiIcons from 'react-icons/ai';

export const NavbarData = [
    {
        title:"Featured",
        path:'/',
        icon:<BiIcons.BiTrendingUp />,
        cName:'nav-text',
        show: true //if true shows when no user is signed in if false onlt shows when a user is logged in
    },
    {
        title:"Tourmanents",
        path:'/search',
        icon:<AiIcons.AiOutlineHome />,
        cName:'nav-text',
        show: true
    },
    {
        title:"FAQ",
        path:'/faq',
        icon:<AiIcons.AiOutlineQuestionCircle />,
        cName:'nav-text',
        show: true
    },
    {
        title:"My Tournaments",
        path:'/mypage',
        icon:<AiIcons.AiOutlineProfile />,
        cName:'nav-text',
        show : false
    },
    // {
    //     title:"History",
    //     path:'/',
    //     icon:<AiIcons.AiOutlineProfile />,
    //     cName:'nav-text'
    // },
    {
        title:"Profile",
        path:'/profile',
        icon:<CgIcons.CgProfile />,
        cName:'nav-text',
        show : false
    },
];