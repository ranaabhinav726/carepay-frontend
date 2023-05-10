import Logo from '../../assets/Logo-carepay.webp'
import React, {useEffect} from "react";
// import Logo from '../../assets/Logo-carepay.svg'
import { BiArrowBack } from "react-icons/bi";
import './header.scss'

import ProgressBar from "./Progressbar";
import { useNavigate } from "react-router-dom";

const Header = ({progressbarDisplay, progress, canGoBack}) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log(progressbarDisplay, "hh")
  return (
     <header className='doctor'>
      <img className="header--logo" src={Logo}></img>
      <div className="lower">
        {canGoBack && <BiArrowBack onClick={()=>navigate(-1)} className="back" />}
        <ProgressBar display={progressbarDisplay} progress={progress} />
      </div>
     </header>
  );
}

export default Header
