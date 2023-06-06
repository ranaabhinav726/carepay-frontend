import React, {useEffect} from "react";
import Logo from '../../assets/Logo-carepay.svg'
import { BiArrowBack } from "react-icons/bi";
import './header.scss'

import ProgressBar from "./Progressbar";
import { useNavigate } from "react-router-dom";

const Header = ({progressbarDisplay="none", progress, canGoBack="0"}) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log(progressbarDisplay, "hh")
  return (
     <header className="patient">
      <img className="header--logo" src={Logo}></img>
      <div className="progressDiv" style={{display:(progressbarDisplay==="none"?"none":"flex")}}>
        {canGoBack!=="0" && <BiArrowBack onClick={()=>navigate(canGoBack)} className="back" />}
        <ProgressBar display={progressbarDisplay} progress={progress} />
      </div>
     </header>
  );
}

export default Header
