import React, { useState } from 'react';
import BarIcon from './imagesscouts/bar.png';
import CrossIcon from './imagesscouts/cross.png';
import CarepayLogo from '../patient/assets/Logo-carepay.svg';
import { Outlet } from 'react-router-dom';

const ChatGPTMobileMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="screen-width-max">
            <div className="mobile-menu" style={{ position: 'sticky', top: 0, background: '#fff' }}>
                <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <img src={menuOpen ? CrossIcon : BarIcon} style={{ width: '25px' }} />&nbsp;&nbsp;<img src={CarepayLogo} width={'60%'} />
                </div>
                <div style={{ width: window.innerWidth + 'px', }} className={`menu-items ${menuOpen ? 'animated slideInLeft open' : 'animated slideOutRight'}`}>
                    <div className='menu-tab'>On Boarding Leads</div>
                    <div className='menu-tab'>Live Clinics</div>
                    <div className='menu-tab'>Loans</div>
                    <div className='menu-tab' style={{ color: '#FF000066', position: 'fixed', bottom: '20%' }}>Logout</div>
                </div>
            </div>
            {!menuOpen ?

                    <Outlet />
          
                : ""}
        </div>
    );
};

export default ChatGPTMobileMenu;
