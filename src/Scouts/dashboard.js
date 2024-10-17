import React, { useState } from 'react';
import BarIcon from './imagesscouts/bar.png';
import CrossIcon from './imagesscouts/cross.png';
import CarepayLogo from './imagesscouts/logosvg.svg'
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import routes from '../layout/Routes';

const ChatGPTMobileMenu = () => {
    let navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const Logout = () => {
        window.sessionStorage.clear()
        navigate(routes.SCOUTS_MAIN)
    }
    const navigateHanlde=(data)=>{
        setMenuOpen(!menuOpen);

        navigate(data)
    }

    return (
        <div className="screen-width-max">
            <div className="mobile-menu" style={{ position: 'sticky', top: 0, background: '#fff' }}>
                <div style={{display:'flex'}} className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                   <div > <img src={menuOpen ? CrossIcon : BarIcon} style={{ width: menuOpen?'20px':'25px' }} /></div><img src={CarepayLogo} style={{marginLeft:'20px',marginTop:'-4px'}} width={'150px'} />
                </div>
                <div style={{ width: window.innerWidth + 'px', }} className={`menu-items ${menuOpen ? 'animated slideInLeft open' : 'animated slideOutRight'}`}>
                    {/* <div className='menu-tab' style={{cursor:'pointer'}} onClick={()=>navigateHanlde('scouts/onboardleads')} >Onboarding Leads</div>
                    <div className='menu-tab' style={{cursor:'pointer'}} onClick={()=>navigateHanlde('scouts/dashboard')}>Live Clinics</div>
                    <div className='menu-tab' >Loans</div> */}
                    <div className='menu-tab' style={{ color: '#FF000066', position: 'fixed', bottom: '20%',cursor:'pointer' }} onClick={() => Logout()}>Logout</div>
                </div>
            </div>
            {!menuOpen ?

                <Outlet />

                : ""}
        </div>
    );
};

export default ChatGPTMobileMenu;
