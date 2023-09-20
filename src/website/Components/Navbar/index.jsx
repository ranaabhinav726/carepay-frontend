import './navbar.scss'
import logo from '../../assets/CarepayLogo1.webp'

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import PrimaryButton from '../PrimaryButton';

import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

import { handleContactScroll, handleFooterScroll } from '../utility';

function CustomNavbar(){
    const [opened, setOpened] = useState(false);
  
    const handleOpen = () => setOpened(true);
    const handleClose = () => setOpened(false);
    // const Close = () => setClick(false);
    
    return (
        <nav className="custom-navbar">
            <div className="container">
                <div className="navbar-logo">
                    <Link className='logo-link' to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="navItems">
                    <div className="navItems-wrapper">
                        <NavLink className='navItem' to={"/"}>Home</NavLink>
                        {/* <NavLink className='navItem' to={"/solutions"}>Solutions</NavLink> */}
                        <NavLink className='navItem' to={"/about"}>About Us</NavLink>
                        {/* <NavLink className='navItem' to={"/blogs"}>Blogs</NavLink> */}
                        <Link className='navItem' to={""} onClick={handleFooterScroll}>Contact Us</Link>
                        {/* <HashLink to="/#contact">Contact Us</HashLink> */}
                    </div>
                    <PrimaryButton content='Partner Up' to={"javascript:void(0)"} variant='dark' callback={handleContactScroll} />
                </div>
                <GiHamburgerMenu className='hamIcon' onClick={handleOpen} />
                <div className={opened ? "sideItems show" : "sideItems"}>
                        <div className="closeIcon">
                            <GrClose onClick={handleClose} style={{color:"#514C9F"}} />
                        </div>
                    <div className="navItems-wrapper">
                        <NavLink className='navItem' onClick={handleClose} to={"/"}>Home</NavLink>
                        {/* <NavLink className='navItem' onClick={handleClose} to={"/solutions"}>Solutions</NavLink> */}
                        <NavLink className='navItem' onClick={handleClose} to={"/about"}>About Us</NavLink>
                        {/* <NavLink className='navItem' onClick={handleClose} to={"/blogs"}>Blogs</NavLink> */}
                        <NavLink className='navItem' onClick={()=>{handleClose(); handleFooterScroll()}} to={""}>Contact Us</NavLink>
                    </div>
                    <PrimaryButton content='Partner Up' to={"javascript:void(0)"} variant='dark' callback={()=>{handleContactScroll(); handleClose();}} />
                </div>
            </div>
        </nav>
    );
  }

export default CustomNavbar